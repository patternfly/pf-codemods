const rules = {
  "accordion-remove-noBoxShadow": require('./lib/rules/accordion-remove-noBoxShadow'),
  "application-launcher-items": require('./lib/rules/application-launcher-items'),
  "aria-props": require('./lib/rules/aria-props'),
  "global-background-color": require('./lib/rules/global-background-color'),
  "modal-remove-footer-alignment": require('./lib/rules/modal-remove-footer-alignment'),
  "modal-variant": require('./lib/rules/modal-variant'),
  "promoted-components": require('./lib/rules/promoted-components'),
  "progress-remove-info-variant": require('./lib/rules/progress-remove-info-variant'),
  "remove-gutter-size": require('./lib/rules/remove-gutter-size'),
  "select-isExpanded": require('./lib/rules/select-isExpanded'),
  "title-heading-level": require('./lib/rules/title-heading-level'),
  "title-size": require('./lib/rules/title-size'),
  "wizard-text": require('./lib/rules/wizard-text'),
};

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
      rules: Object.keys(rules).reduce((acc, rule) => {
        acc[`pf-codemods/${rule}`] = "error";
        return acc;
      }, {})
    }
  },
  rules
};
