#!/usr/bin/env node
const fspath = require('path');
const { ESLint } = require('eslint');
const { configs, ruleVersionMapping } = require('@patternfly/eslint-plugin-pf-codemods');
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
  .option('--no-cache', 'Disables eslint caching')
  .option('--v4', 'Run v3 to v4 codemods')
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
  results.forEach(result => {
    let numFiltered = 0;
    result.messages = result.messages.filter(message => !(message.ruleId === null && message.severity === 1 && ++numFiltered));
    result.warningCount -= numFiltered;
  });

  const output = formatter.format(results, {
    get rulesMeta() {
      if (!rulesMeta) {
        return eslint.getRulesMetaForResults(results);
      }
      return rulesMeta;
    }
  });
  console.log(output);

  return true;
}

async function runCodemods(path, otherPaths, options) {
  const prefix = "@patternfly/pf-codemods/";

  if (options.only) {
    // Set rules to error like eslint likes
    configs.recommended.rules = options.only
      .split(',')
      .reduce((acc, rule) => {
        acc[prefix + rule] = 'error';
        return acc;
      }, {});
  }

  if (options.exclude) {
    options.exclude.split(',').forEach(rule =>  delete configs.recommended.rules[prefix + rule]);
  }

  ruleVersionMapping[options.v4 ? "v5" : "v4"].forEach(rule => delete configs.recommended.rules[prefix + rule]);

  const eslint = new ESLint({
    extensions: [ '.js', '.jsx', '.ts', '.tsx' ],
    baseConfig: configs.recommended,
    ignore: true,
    overrideConfig: { ignorePatterns: ['**/node_modules/**'] },
    overrideConfigFile: fspath.resolve(__dirname, '.eslintrc'),
    rulePaths: [],
    useEslintrc: false,
    cache: options.cache,
    cacheLocation: '.eslintcache',
    cacheLocation: process.cwd(),
    fix: options.fix,
    // Allow `npx` to work its magic
    resolvePluginsRelativeTo: __dirname
  });
  
  const results = await eslint.lintFiles(otherPaths.concat(path));
  if (options.fix) {
    ESLint.outputFixes(results);
  }
  await printResults(eslint, results, options.format);
}

program.parse(process.argv);
