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

function getRulesToRemove(options) {
  if (options.v4) {
    return [...ruleVersionMapping["v5"], ...ruleVersionMapping["v6"]];
  } else if (options.v6) {
    return [...ruleVersionMapping["v4"], ...ruleVersionMapping["v5"]];
  } else {
    return [...ruleVersionMapping["v4"], ...ruleVersionMapping["v6"]];
  }
}

async function runCodemods(path, otherPaths, options) {
  const prefix = "@patternfly/pf-codemods/";

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

  const rulesToRemove = getRulesToRemove(options);

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
