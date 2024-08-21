/** if you want your rule to only run when explicitly called for using the --only flag,
 * add the rule name to the below array. Do not add rules here if the React PR is
 * not yet merged; instead add a "do not merge" label to the codemod PR.
 */
export const betaRuleNames: string[] = [
  "data-codemods-cleanup",
  "kebabToggle-replace-with-menuToggle",
];

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
  "drawerHead-warn-updated-markup",
  "emptyState-warn-change-structure",
  "formControls-updated-markup",
  "helperTextItem-warn-screenReaderText-update",
  "horizontalSubnav-warn-ariaLabel",
  "jumpLinksItem-warn-markup-change",
  "label-warn-truncated-default",
  "loginMainHeader-warn-updated-markup",
  "logViewer-moved-styles",
  "menuItemAction-warn-update-markup",
  "menuToggle-warn-iconOnly-toggle",
  "nav-warn-flyouts-now-inline",
  "notificationBadge-warn-markup-change",
  "notificationDrawerHeader-warn-update-markup",
  "overflowMenu-warn-updated-dropdownItem",
  "page-warn-updated-markup",
  "pageBreadcrumbAndSection-warn-updated-wrapperLogic",
  "pageSection-warn-variantClasses-applied",
  "pagination-warn-markup-changed",
  "popover-warn-appendTo-default",
  "popper-update-appendTo-default",
  "react-dropzone-warn-upgrade",
  "simpleFileUpload-warn-changes",
  "sliderStep-warn-update-markup",
  "table-warn-actionsColumn",
  "table-warn-thExpandType",
  "tabs-update-markup",
  "tabs-warn-children-type-changed",
  "Th-Td-warn-update-markup",
  "toolbarLabelGroupContent-updated-markup",
  "tooltip-warn-triggerRef-may-be-required",
  "treeView-warn-selectable-styling-modifier-removed",
  "user-feedback-warn-changes",
  "wizard-warn-button-order",
  "wizardFooter-warn-update-markup",
  "wizardNavItem-warn-update-markup",
];

// rules that will run before other rules (move to deprecated?)
export const setupRules = [
  "applicationLauncher-deprecated",
  "chip-deprecated",
  "contextSelector-update-deprecatedPath",
  "dropdown-update-deprecatedPath",
  "datalist-remove-selectableRow",
  "optionsMenu-deprecated",
  "pageHeader-deprecated",
  "select-deprecated",
  "table-update-deprecatedPath",
  "tile-deprecated",
  "wizard-update-deprecatedPath",
];

// rules that will run after other rules (cleanup imports?)
export const cleanupRules = [
  "no-unused-imports-v5",
  "no-unused-imports-v6",
  "no-duplicate-import-specifiers",
];
