// if you want your rule to only run when explicitly called for using the --only flag, add the rule name to the below array
export const betaRuleNames: string[] = [];

// if you want a rule to have a severity that defaults to warning rather than error, add the rule name to the below array
export const warningRules = [
  "aboutModalBoxHero-remove-subcomponent",
  "accordionItem-warn-update-markup",
  "applicationLauncher-warn-input",
  "card-deprecate-props",
  "card-warn-component",
  "charts-warn-tooltip",
  "chip-update-badgeAPI",
  "conditional-aria",
  "datePicker-warn-appendTo-default-value-changed",
  "datetimepicker-warn-helperText",
  "deprecatedSelect-warn-markupUpdated",
  "emptyState-warn-change-structure",
  "formControls-updated-markup",
  "horizontalSubnav-warn-ariaLabel",
  "jumpLinksItem-warn-markup-change",
  "label-warn-truncated-default",
  "nav-warn-flyouts-now-inline",
  "overflowMenu-warn-updated-dropdownItem",
  "pageSection-warn-variantClasses-applied",
  "popover-warn-appendTo-default",
  "react-dropzone-warn-upgrade",
  "table-warn-actionsColumn",
  "table-warn-thExpandType",
  "tabs-warn-children-type-changed",
  "tooltip-warn-triggerRef-may-be-required",
  "wizard-warn-button-order",
];

// rules that will run before other rules (move to deprecated?)
export const setupRules = [
  "applicationLauncher-deprecated",
  "contextSelector-update-deprecatedPath",
  "dropdown-update-deprecatedPath",
  "datalist-remove-selectableRow",
  "optionsMenu-deprecated",
  "pageHeader-deprecated",
  "select-deprecated",
  "table-update-deprecatedPath",
  "wizard-update-deprecatedPath",
];

// rules that will run after other rules (cleanup imports?)
export const cleanupRules = ["no-unused-imports-v5"];
