const { RuleTester } = require("eslint");

const ruleTester = new RuleTester({ parserOptions: {
  sourceType: 'module',
  ecmaVersion: 2015,
  ecmaFeatures: {
    jsx: true
  }
}});

module.exports = ruleTester