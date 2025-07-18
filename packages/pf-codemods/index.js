#!/usr/bin/env node
const fspath = require("path");
const { ESLint } = require("eslint");
const {
  configs,
  ruleVersionMapping,
  setupRules,
  cleanupRules,
} = require("@patternfly/eslint-plugin-pf-codemods/dist/js");
const { Command } = require("commander");
const program = new Command();

program
  .version(require("./package.json").version)
  .description("Run codemods on path using eslint.")
  .arguments("<path> [otherPaths...]")
  .option("--only <rules>", "Comma-seperated list of rules to run")
  .option(
    "--exclude <rules>",
    "Run recommended rules EXCLUDING this comma-seperated list"
  )
  .option("--fix", "Whether to run fixer")
  .option("--format <format>", "What eslint report format to use", "stylish")
  .option("--no-cache", "Disables eslint caching")
  .option("--v4", "Run v3 to v4 codemods")
  .option("--v5", "Run v4 to v5 codemods")
  .option("--v6", "Run v5 to v6 codemods")
  .action(runCodemods);

/**
 * Outputs the results of the linting.
 * @param {Eslint} The Eslint to use.
 * @param {LintResult[]} results The results to print.
 * @param {string} format The name of the formatter to use or the path to the formatter.
 * @returns {boolean} True if the printing succeeds, false if not.
 * @private
 */
async function printResults(eslint, results, format) {
  let formatter;
  let rulesMeta;

  try {
    formatter = await eslint.loadFormatter(format);
  } catch (e) {
    console.error(e.message);
    return false;
  }

  // suppress non-pf-codemod related (BaseConfig/eslint-disable-next-line) warnings
  results.forEach((result) => {
    let numFiltered = 0;
    result.messages = result.messages.filter(
      (message) =>
        !(message.ruleId === null && message.severity === 1 && ++numFiltered)
    );
    result.warningCount -= numFiltered;
  });

  const output = formatter.format(results, {
    get rulesMeta() {
      if (!rulesMeta) {
        return eslint.getRulesMetaForResults(results);
      }
      return rulesMeta;
    },
  });
  console.log(output);

  return true;
}

async function getRulesToRemove(options) {
  const pfVersions = ["v6", "v5", "v4"];
  let selectedVersion = pfVersions.find((version) => options[version]);

  // If only enable-animations is being run, skip the PatternFly version prompt and default to v6 logic
  let skipVersionPrompt = false;
  if (options.only && options.only.split(",").length === 1 && options.only.includes("enable-animations")) {
    skipVersionPrompt = true;
  }

  if (!selectedVersion && !skipVersionPrompt) {
    const inquirer = await import("inquirer");
    const answer = await inquirer.default.prompt([
      {
        type: "list",
        name: "version",
        message: "What PatternFly version are you updating to?",
        choices: [
          { name: "V5 -> V6", value: "v6" },
          { name: "V4 -> V5", value: "v5" },
          { name: "V3 -> V4", value: "v4" },
        ],
      },
    ]);
    selectedVersion = answer.version;
  } else if (skipVersionPrompt) {
    return [];
  }

  return pfVersions.flatMap((version) =>
    version === selectedVersion ? [] : ruleVersionMapping[version]
  );
}

async function runCodemods(path, otherPaths, options) {
  const prefix = "@patternfly/pf-codemods/";

  // Determine if enable-animations is being run
  let enableAnimationsRule = false;
  if (options.only) {
    enableAnimationsRule = options.only.split(",").includes("enable-animations");
  } else {
    enableAnimationsRule = Object.keys(configs.recommended.rules).includes(prefix + "enable-animations");
  }

  let enableAnimationsIncludeTable = false;
  if (enableAnimationsRule) {
    const inquirer = await import("inquirer");
    const answer = await inquirer.default.prompt([
      {
        type: "list",
        name: "includeTable",
        message:
          "This will update several React Core components. Would you like to include Table? (Note: Opting into table animations may require structural updates in your codebase. See our release highlights for more information.)",
        choices: [
          { name: "Just React Core components", value: false },
          { name: "React Core and Table components", value: true },
        ],
        default: 0,
      },
    ]);
    enableAnimationsIncludeTable = answer.includeTable;
  }

  if (options.only) {
    // Set rules to error like eslint likes
    configs.recommended.rules = options.only.split(",").reduce((acc, rule) => {
      acc[prefix + rule] = "error";
      return acc;
    }, {});
  }

  if (options.exclude) {
    options.exclude
      .split(",")
      .forEach((rule) => delete configs.recommended.rules[prefix + rule]);
  }

  const rulesToRemove = await getRulesToRemove(options);

  rulesToRemove.forEach((rule) => {
    // data-codemods-cleanup rule should exist for any version of codemods
    if (rule !== "data-codemods-cleanup") {
      delete configs.recommended.rules[prefix + rule];
    }
  });
  const eslintBaseConfig = {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    baseConfig: configs.recommended,
    ignore: true,
    overrideConfig: { ignorePatterns: ["**/node_modules/**"] },
    overrideConfigFile: fspath.resolve(__dirname, ".eslintrc"),
    rulePaths: [],
    useEslintrc: false,
    cache: options.cache,
    cacheLocation: ".eslintcache",
    cacheLocation: process.cwd(),
    fix: options.fix,
    // Allow `npx` to work its magic
    resolvePluginsRelativeTo: __dirname,
  };

  // runFirstRules = setupRules.map(r => prefix + r);
  // runLastRules = cleanupRules.map(r => cleanupRules + r);
  rulesArr = Object.keys(configs.recommended.rules).map((k) => {
    return {
      name: k,
      rule: { [k]: configs.recommended.rules[k] },
    };
  });
  const eslints = [
    (r) => setupRules.map((r) => prefix + r).includes(r.name),
    (r) =>
      ![...setupRules, ...cleanupRules].map((r) => prefix + r).includes(r.name),
    (r) => cleanupRules.map((r) => prefix + r).includes(r.name),
  ].map((filterFunc) => {
    return new ESLint({
      ...eslintBaseConfig,
      baseConfig: {
        ...configs.recommended,
        rules: Object.assign(
          {},
          ...rulesArr.filter(filterFunc).map((r) => r.rule)
        ),
        settings: enableAnimationsRule ? {
          enableAnimationsIncludeTable: enableAnimationsIncludeTable
        } : {}
      },
    });
  });

  const results = [];
  for await (const eslint of eslints) {
    const result = await eslint.lintFiles(otherPaths.concat(path));
    if (options.fix) {
      await ESLint.outputFixes(result);
    }
    results.push(result);
  }

  function mergeResults(resultLists) {
    const mergedResults = [];
    const seenFilePaths = new Set();
    resultLists.forEach((results) => {
      results.forEach((result) => {
        if (!seenFilePaths.has(result.filePath)) {
          seenFilePaths.add(result.filePath);
          mergedResults.push(result);
        } else {
          const matchingResult = mergedResults.find(
            (r) => r.filePath === result.filePath
          );
          matchingResult.messages.push(...result.messages);
          matchingResult.suppressedMessages.push(...result.suppressedMessages);
          matchingResult.errorCount += result.errorCount;
          matchingResult.fatalErrorCount += result.fatalErrorCount;
          matchingResult.warningCount += result.warningCount;
          matchingResult.fixableErrorCount += result.fixableErrorCount;
          matchingResult.fixableWarningCount += result.fixableWarningCount;
        }
      });
    });
    return mergedResults;
  }

  await printResults(eslints[0], mergeResults(results), options.format);
}

program.parse(process.argv);
