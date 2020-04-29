const { RuleTester } = require("eslint");

module.exports = new RuleTester({ parserOptions: {
  sourceType: 'module',
  ecmaVersion: 2015,
  ecmaFeatures: {
    jsx: true
  }
}});
