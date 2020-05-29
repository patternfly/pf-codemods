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
    currentOptions = options.parse(process.argv);
  } catch (error) {
    console.error(error.message);
    return 2;
  }
  
  const engine = new CLIEngine({
    envs: undefined,
    extensions: [ '.js', '.jsx', '.ts', '.tsx' ],
    rules: undefined,
    plugins: undefined,
    globals: undefined,
    ignore: true,
    ignorePath: undefined,
    ignorePattern: '**/node_modules/**',
    configFile: path.join(__dirname, '/.eslintrc.json'),
    rulePaths: [],
    useEslintrc: false,
    parser: undefined,
    parserOptions: undefined,
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