const { createMoveSpecifiersTester } = require("../../testHelpers");
const specifiersToMove = [
  "Wizard",
  "WizardProps",
  "WizardStep",
  "WizardContext",
  "WizardContextType",
  "WizardNav",
  "WizardNavProps",
  "WizardNavItem",
  "WizardNavItemProps",
  "WizardHeader",
  "WizardHeaderProps",
  "WizardBody",
  "WizardBodyProps",
  "WizardFooter",
  "WizardFooterProps",
  "WizardToggle",
  "WizardToggleProps"
];

createMoveSpecifiersTester(
  "wizard-update-deprecatedPath",
  specifiersToMove,
  "new Wizard"
);
