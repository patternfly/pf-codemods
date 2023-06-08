const { createMoveSpecifiersTester } = require("../../testHelpers");
const specifiersToMove = [
  "Wizard",
  "WizardProps",
  "WizardStep",
  "WizardStepFunctionType",
  "WizardContext",
  "WizardContextType",
  "WizardContextProvider",
  "WizardContextConsumer",
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
