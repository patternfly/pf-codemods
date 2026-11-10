const { RuleTester } = require('eslint');
const parser = require('@typescript-eslint/parser');

module.exports = new RuleTester({
  languageOptions: {
    parser,
    ecmaVersion: 'latest',
    sourceType: 'module',
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      }
    }
  }
});
