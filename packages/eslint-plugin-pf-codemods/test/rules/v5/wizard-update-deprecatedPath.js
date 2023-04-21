const { createMoveSpecifiersTester } = require("../../testHelpers");
const importsToMove = [
  { name: "Wizard", type: "component" },
  { name: "WizardContext", type: "context" },
  { name: "WizardNav", type: "component" },
  { name: "WizardNavItem", type: "component" },
  { name: "WizardHeader", type: "component" },
  { name: "WizardBody", type: "component" },
  { name: "WizardFooter", type: "component" },
  { name: "WizardToggle", type: "component" },
];

createMoveSpecifiersTester(
  "wizard-update-deprecatedPath",
  importsToMove,
  "new Wizard"
);
