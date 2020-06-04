#!/usr/bin/env node
const path = require('path');
const options = require('eslint/lib/options');
const { CLIEngine } = require('eslint/lib/cli-engine');

/**
 * Outputs the results of the linting.
 * @param {CLIEngine} engine The CLIEngine to use.
 * @param {LintResult[]} results The results to print.
 * @param {string} format The name of the formatter to use or the path to the formatter.
 * @returns {boolean} True if the printing succeeds, false if not.
 * @private
 */
function printResults(engine, results, format) {
  let formatter;
  let rulesMeta;

  try {
    formatter = engine.getFormatter(format);
  } catch (e) {
    log.error(e.message);
    return false;
  }

  // Don't show warnings
  results.forEach(result => result.messages = result.messages.filter(message => message.severity === 2));

  const output = formatter(results, {
    get rulesMeta() {
      if (!rulesMeta) {
        rulesMeta = {};
        for (const [ruleId, rule] of engine.getRules()) {
          rulesMeta[ruleId] = rule.meta;
        }
      }
      return rulesMeta;
    }
  });
  console.log(output);

  return true;
}

function main() {
  let currentOptions;

  try {
    // remove --rules for parsing purposes
    let arguments = [...process.argv];
    if (process.argv.includes('--rules')) {
      arguments.splice(arguments.indexOf('--rules'),2);
    }
    currentOptions = options.parse(arguments);

  } catch (error) {
    console.error(error.message);
    return 2;
  }

  // construct rules from cli, if provide
  let finalRules = [];
  if (process.argv.includes('--rules')) {
    const cliRules = process.argv.splice(process.argv.indexOf('--rules') + 1, 1)[0].split(' ');

    for (let i = 0; i < cliRules.length; i++) {
      try {
        finalRules[cliRules[i]] = require('../eslint-plugin-pf-codemods/lib/rules/' + cliRules[i]);

      } catch (error) {
        const iRule = error.message.split("/");
        console.error("Invalid Rule: " + iRule[iRule.lastIndexOf('rules') + 1])
        return 2;
      }
    }

    currentOptions.env = { browser: true, node: true,es6: true };
    currentOptions.parser = "@typescript-eslint/parser";
    currentOptions.parserOptions = {sourceType: "module", ecmaFeatures: { jsx: true }};
    currentOptions.configFile = undefined;
    currentOptions.rules = Object.keys(finalRules).reduce((acc, rule) => {
      acc[`pf-codemods/${rule}`] = "error";
      return acc;
    }, {});

  } else {
    currentOptions.configFile = path.join(__dirname, '/.eslintrc.json');
  }


  const engine = new CLIEngine({
    env: currentOptions.env,
    extensions: [ '.js', '.jsx', '.ts', '.tsx' ],
    rules:  currentOptions.rules,
    plugins: undefined,
    globals: undefined,
    ignore: true,
    ignorePath: undefined,
    ignorePattern: '**/node_modules/**',
    configFile: currentOptions.configFile,
    rulePaths: [],
    useEslintrc: false,
    parser: currentOptions.parser,
    parserOptions: currentOptions.parserOptions,
    cache: true,
    cacheFile: '.eslintcache',
    cacheLocation: process.cwd(),
    fix: currentOptions.fix,
    fixTypes: undefined,
    allowInlineConfig: undefined,
    reportUnusedDisableDirectives: undefined,
    resolvePluginsRelativeTo: __dirname,
    errorOnUnmatchedPattern: undefined
  });
  
  const report = engine.executeOnFiles(currentOptions._);
  
  if (currentOptions.fix) {
    CLIEngine.outputFixes(report);
  }
  
  printResults(engine, report.results, currentOptions.format);
}

main();
