const rules = {
  "accordion-remove-noBoxShadow": require('./lib/rules/accordion-remove-noBoxShadow'),
  "application-launcher-rename-dropdownItems": require('./lib/rules/application-launcher-rename-dropdownItems'),
  "aria-props": require('./lib/rules/aria-props'),
  "global-background-color": require('./lib/rules/global-background-color'),
  "modal-remove-footer-alignment": require('./lib/rules/modal-remove-footer-alignment'),
  "modal-variant": require('./lib/rules/modal-variant'),
  "no-experimental-imports": require('./lib/rules/no-experimental-imports'),
  "progress-remove-info-variant": require('./lib/rules/progress-remove-info-variant'),
  "remove-gutter-size": require('./lib/rules/remove-gutter-size'),
  "select-rename-isExpanded": require('./lib/rules/select-rename-isExpanded'),
  "title-require-heading-level": require('./lib/rules/title-require-heading-level'),
  "title-size": require('./lib/rules/title-size'),
  "wizard-rename-text": require('./lib/rules/wizard-rename-text'),
  "wizard-rename-hasBodyPadding": require('./lib/rules/wizard-rename-hasBodyPadding'),
  "wizard-remove-props": require('./lib/rules/wizard-remove-props'),
  "background-image-src-enum": require('./lib/rules/background-image-src-enum'),
  "skip-to-content-remove-component": require('./lib/rules/skip-to-content-remove-component'),
  "alert-new-action": require('./lib/rules/alert-new-action'),
  "card-rename-components": require('./lib/rules/card-rename-components'),
  "chipgroup-remove-props": require('./lib/rules/chipgroup-remove-props'),
  "chipgroup-remove-props": require('./lib/rules/chipgroup-remove-props'),
  "chipgroup-remove-chipbutton": require('./lib/rules/chipgroup-remove-chipbutton'),
  "chipgroup-remove-chipbutton": require('./lib/rules/chipgroup-remove-chipbutton'),
  "chipgroup-remove-chipgrouptoolbaritem": require('./lib/rules/chipgroup-remove-chipgrouptoolbaritem'),
  "dropdown-rename-icon": require('./lib/rules/dropdown-rename-icon'),
  "dropdown-toggle-rename-iconComponent": require('./lib/rules/dropdown-toggle-rename-iconComponent'),
  "empty-state-icon-removed-props": require('./lib/rules/empty-state-icon-removed-props'),
  "pagination-removed-variant": require('./lib/rules/pagination-removed-variant'),
  "remove-isPseudo-props": require('./lib/rules/remove-isPseudo-props'),
  "label-remove-isCompact": require('./lib/rules/label-remove-isCompact'),
  "rename-noPadding": require('./lib/rules/rename-noPadding'),
  "tab-title-text": require('./lib/rules/tab-title-text'),
  "nav-list-variant": require('./lib/rules/nav-list-variant'),
  "table-removed-transforms": require('./lib/rules/table-removed-transforms'),
  "select-rename-checkbox": require('./lib/rules/select-rename-checkbox'),
  "remove-unused-imports": require('./lib/rules/remove-unused-imports'),
  "tab-rename-variant": require('./lib/rules/tab-rename-variant'),
  "form-fix-isValid": require('./lib/rules/form-fix-isValid'),
  "expandable-rename-expandablesection": require('./lib/rules/expandable-rename-expandablesection'),
  "rename-toolbar-components": require('./lib/rules/rename-toolbar-components'),
  "page-header-prop-rename": require('./lib/rules/page-header-prop-rename'),
  "use-page-header-tools": require('./lib/rules/use-page-header-tools'),
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
