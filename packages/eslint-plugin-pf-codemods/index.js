module.exports = {
  configs: {
    recommended: {
      plugins: ['pf-codemods'],
      env: {
        browser: true,
        node: true,
        es6: true
      },
      noInlineConfig: true,
      reportUnusedDisableDirectives: false,
      parser: "@typescript-eslint/parser",
      parserOptions: {
        sourceType: "module",
        ecmaFeatures: {
          jsx: true
        }
      },
      rules: {
        "title-heading-level": "error"
      }
    }
  },
  rules: {
    "remove-variant-enum": require('./lib/rules/remove-variant-enum'),
    "title-heading-level": require('./lib/rules/title-heading-level')
  }
};
