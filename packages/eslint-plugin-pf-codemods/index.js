const v5rules = {
  "accordion-rename-displaySize-large": require('./lib/rules/v5/accordion-rename-displaySize-large'),
  "card-remove-isHoverable": require('./lib/rules/v5/card-remove-isHoverable'),
  "charts-resizeObserver-import": require('./lib/rules/v5/charts-resizeObserver-import'),
  "clipboardCopy-remove-popoverPosition": require('./lib/rules/v5/clipboardCopy-remove-popoverPosition'),
  "datalist-remove-ondrags": require('./lib/rules/v5/datalist-remove-ondrags'),
  "divider-remove-isVertical": require('./lib/rules/v5/divider-remove-isVertical'),
  "expandable-section-rename-displaySize-large": require('./lib/rules/v5/expandable-section-rename-displaySize-large'),
  "fileUpload-remove-onChange": require('./lib/rules/v5/fileUpload-remove-onChange'),
  "horizontalSubnav-ariaLabel": require('./lib/rules/v5/horizontalSubnav-ariaLabel'),
  "pagination-optionsToggle": require('./lib/rules/v5/pagination-optionsToggle'),
  "pagination-remove-ToggleTemplateProps": require('./lib/rules/v5/pagination-remove-ToggleTemplateProps'),
  "pagination-rename-props": require('./lib/rules/v5/pagination-rename-props'),
  "remove-sticky-props": require('./lib/rules/v5/remove-sticky-props'),
  "resizeObserver-function-param": require('./lib/rules/v5/resizeObserver-function-param'),
  "simpleList-remove-isCurrent": require('./lib/rules/v5/simpleList-remove-isCurrent'),
  "spinner-svg-default": require('./lib/rules/v5/spinner-svg-default'),
  "tableComposable-remove-hasSelectableRowCaption": require('./lib/rules/v5/tableComposable-remove-hasSelectableRowCaption'),
  "tabs-rename-hasBorderBottom": require('./lib/rules/v5/tabs-rename-hasBorderBottom'),
  "tabs-remove-hasSecondaryBorderBottom": require('./lib/rules/v5/tabs-remove-hasSecondaryBorderBottom'),
  "toggle-remove-isPrimary": require('./lib/rules/v5/toggle-remove-isPrimary'),
  "toolbar-remove-visiblity": require('./lib/rules/v5/toolbar-remove-visiblity'),
  "tooltip-remove-props": require('./lib/rules/v5/tooltip-remove-props'),
  "remove-removeFindDomNode": require('./lib/rules/v5/remove-removeFindDomNode'),
  "popover-remove-props": require('./lib/rules/v5/popover-remove-props'),
  "warn-key-codes-removed": require('./lib/rules/v5/warn-key-codes-removed'),
};

const v4rules = {
  "accordion-remove-noBoxShadow": require('./lib/rules/v4/accordion-remove-noBoxShadow'),
  "application-launcher-rename-dropdownItems": require('./lib/rules/v4/application-launcher-rename-dropdownItems'),
  "aria-props": require('./lib/rules/v4/aria-props'),
  "global-background-color": require('./lib/rules/v4/global-background-color'),
  "modal-remove-props": require('./lib/rules/v4/modal-remove-props'),
  "modal-variant": require('./lib/rules/v4/modal-variant'),
  "no-experimental-imports": require('./lib/rules/v4/no-experimental-imports'),
  "progress-remove-info-variant": require('./lib/rules/v4/progress-remove-info-variant'),
  "remove-gutter-size": require('./lib/rules/v4/remove-gutter-size'),
  "select-rename-isExpanded": require('./lib/rules/v4/select-rename-isExpanded'),
  "title-require-heading-level": require('./lib/rules/v4/title-require-heading-level'),
  "title-size": require('./lib/rules/v4/title-size'),
  "wizard-rename-text": require('./lib/rules/v4/wizard-rename-text'),
  "wizard-rename-hasBodyPadding": require('./lib/rules/v4/wizard-rename-hasBodyPadding'),
  "wizard-remove-props": require('./lib/rules/v4/wizard-remove-props'),
  "background-image-src-enum": require('./lib/rules/v4/background-image-src-enum'),
  "skip-to-content-remove-component": require('./lib/rules/v4/skip-to-content-remove-component'),
  "alert-new-action": require('./lib/rules/v4/alert-new-action'),
  "card-rename-components": require('./lib/rules/v4/card-rename-components'),
  "chipgroup-remove-props": require('./lib/rules/v4/chipgroup-remove-props'),
  "chipgroup-remove-chipbutton": require('./lib/rules/v4/chipgroup-remove-chipbutton'),
  "chipgroup-remove-chipgrouptoolbaritem": require('./lib/rules/v4/chipgroup-remove-chipgrouptoolbaritem'),
  "dropdown-rename-icon": require('./lib/rules/v4/dropdown-rename-icon'),
  "dropdown-toggle-rename-iconComponent": require('./lib/rules/v4/dropdown-toggle-rename-iconComponent'),
  "empty-state-icon-removed-props": require('./lib/rules/v4/empty-state-icon-removed-props'),
  "pagination-removed-variant": require('./lib/rules/v4/pagination-removed-variant'),
  "remove-isPseudo-props": require('./lib/rules/v4/remove-isPseudo-props'),
  "label-remove-isCompact": require('./lib/rules/v4/label-remove-isCompact'),
  "rename-noPadding": require('./lib/rules/v4/rename-noPadding'),
  "tab-title-text": require('./lib/rules/v4/tab-title-text'),
  "nav-list-variant": require('./lib/rules/v4/nav-list-variant'),
  "table-removed-transforms": require('./lib/rules/v4/table-removed-transforms'),
  "select-rename-checkbox": require('./lib/rules/v4/select-rename-checkbox'),
  "no-unused-imports": require('./lib/rules/v4/no-unused-imports'),
  "tab-rename-variant": require('./lib/rules/v4/tab-rename-variant'),
  "form-fix-isValid": require('./lib/rules/v4/form-fix-isValid'),
  "expandable-rename-expandablesection": require('./lib/rules/v4/expandable-rename-expandablesection'),
  "rename-toolbar-components": require('./lib/rules/v4/rename-toolbar-components'),
  "page-header-prop-rename": require('./lib/rules/v4/page-header-prop-rename'),
  "page-header-move-avatar": require('./lib/rules/v4/page-header-move-avatar'),
  "refactor-breakpointmods": require('./lib/rules/v4/refactor-breakpointmods'),
  "datatoolbar-rename-toolbar": require('./lib/rules/v4/datatoolbar-rename-toolbar'),
  "chartVoronoiContainer-remove-allowTooltip": require('./lib/rules/v4/chartVoronoiContainer-remove-allowTooltip'),
  "chart-remove-allowZoom": require('./lib/rules/v4/chartVoronoiContainer-remove-allowTooltip'),
  "react-icons-remove-icon": require('./lib/rules/v4/react-icons-remove-icon'),
};

// if you want a rule to have a severity that defaults to warning rather than error, add the rule name to the below array
const warningRules = ["horizontalSubnav-ariaLabel"]

const createRules = (rules) => {
  return Object.keys(rules).reduce((acc, rule) => {
    const severity = warningRules.includes(rule) ? "warn" : "error"
    acc[`@patternfly/pf-codemods/${rule}`] = severity;
    return acc;
  }, {})
}

const mappedRules = {...createRules(v5rules), ...createRules(v4rules)};

module.exports = {
  configs: {
    recommended: {
      plugins: ["@patternfly/pf-codemods"],
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      noInlineConfig: true,
      reportUnusedDisableDirectives: false,
      parser: "@typescript-eslint/parser",
      parserOptions: {
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: mappedRules,
    },
  },
  rules: {...v5rules, ...v4rules},
  ruleVersionMapping: {"v4": Object.keys(v4rules), "v5": Object.keys(v5rules)}
};
