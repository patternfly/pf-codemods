const { createMoveSpecifiersTester } = require("../../testHelpers");
const specifiersToMove = [
  "Wizard",
  "WizardContext",
  "WizardNav",
  "WizardNavItem",
  "WizardHeader",
  "WizardBody",
  "WizardFooter",
  "WizardToggle",
];

createMoveSpecifiersTester(
  "wizard-update-deprecatedPath",
  specifiersToMove,
  "new Wizard"
);
