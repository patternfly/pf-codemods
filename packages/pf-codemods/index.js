#!/usr/bin/env node
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

let currentOptions;
try {
  currentOptions = options.parse(process.argv);
} catch (error) {
  console.error(error.message);
  return 2;
}

const engine = new CLIEngine({
  envs: [
    "browser",
    "node",
    "es6"
  ],
  extensions: [ '.js', '.jsx', '.ts', '.tsx' ],
  rules: {
    "title-heading-level": "error"
  },
  plugins: ['pf-codemods'],
  globals: undefined,
  ignore: true,
  ignorePath: undefined,
  ignorePattern: undefined,
  configFile: undefined,
  rulePaths: [],
  useEslintrc: false,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  cache: false,
  cacheFile: '.eslintcache',
  cacheLocation: undefined,
  fix: currentOptions.fix,
  fixTypes: undefined,
  allowInlineConfig: false,
  reportUnusedDisableDirectives: false,
  resolvePluginsRelativeTo: undefined,
  errorOnUnmatchedPattern: true
});

const report = engine.executeOnFiles(currentOptions._);

if (currentOptions.fix) {
  CLIEngine.outputFixes(report);
}

printResults(engine, report.results, currentOptions.format);
