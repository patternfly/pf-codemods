const { moveSpecifiers } = require("../../helpers");

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
const fromPackage = "@patternfly/react-core";
const toPackage = "@patternfly/react-core/deprecated";
const messageAfterSpecifierPathChange =
  "been deprecated. Running the fix flag will update your imports and/or exports to our deprecated package, but we suggest using our new Wizard implementation.";

// https://github.com/patternfly/patternfly-react/pull/8821
module.exports = {
  meta: { fixable: "code" },
  create: moveSpecifiers(
    specifiersToMove,
    fromPackage,
    toPackage,
    messageAfterSpecifierPathChange
  ),
};
