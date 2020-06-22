#!/usr/bin/env node
const options = require('eslint/lib/options');
const { CLIEngine } = require('eslint/lib/cli-engine');
const { configs } = require('eslint-plugin-pf-codemods');
const { Command } = require('commander');
const program = new Command();

program
  .version(require('./package.json').version)
  .description('Run codemods on path using eslint.')
  .arguments('<path> [otherPaths...]')
  .option('--only <rules>', 'Comma-seperated list of rules to run')
  .option('--exclude <rules>', 'Run recommended rules EXCLUDING this comma-seperated list')
  .option('--fix', 'Whether to run fixer')
  .option('--format <format>', 'What eslint report format to use', 'stylish')
  .action(runCodemods);

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

async function runCodemods(path, otherPaths, options) {
  console.log('Waiting 5s', process.cwd(), __dirname);
  await new Promise((resolve) => setTimeout(resolve, 5000));
  if (options.only) {
    // Set rules to error like eslint likes
    configs.recommended.rules = options.only
      .split(',')
      .reduce((acc, rule) => {
        acc[rule] = 'error';
        return acc;
      }, {});
  }
  if (options.exclude) {
    options.exclude.split(',').forEach(rule => delete configs.recommended.rules[rule]);
  }

  delete configs.recommended.parser;
  delete configs.recommended.parserOptions;

  const engine = new CLIEngine({
    extensions: [ '.js', '.jsx', '.ts', '.tsx' ],
    baseConfig: configs.recommended,
    ignore: true,
    ignorePattern: '**/node_modules/**',
    configFile: false,
    rulePaths: [],
    useEslintrc: false,
    cache: true,
    cacheFile: '.eslintcache',
    cacheLocation: process.cwd(),
    fix: options.fix,
    parser: '@typescript-eslint/parser',
    parserOptions: { sourceType: "module", ecmaFeatures: { jsx: true } },
    resolvePluginsRelativeTo: __dirname
  });
  
  const report = engine.executeOnFiles(otherPaths.concat(path));
  
  if (options.fix) {
    CLIEngine.outputFixes(report);
  }
  
  printResults(engine, report.results, options.format);
}

program.parse(process.argv);
