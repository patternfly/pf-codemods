const { moveSpecifiers } = require("../../helpers");

const specifiersToMove = [
  "Dropdown",
  "DropdownProps",
  "DropdownGroup",
  "DropdownGroupProps",
  "DropdownItem",
  "DropdownItemProps",
  "DropdownList",
  "DropdownListProps",
  "Select",
  "SelectProps",
  "SelectGroup",
  "SelectGroupProps",
  "SelectList",
  "SelectListProps",
  "SelectOption",
  "SelectOptionProps",
  "Wizard",
  "WizardProps",
  "WizardBody",
  "WizardBodyProps",
  "WizardContext",
  "useWizardContext",
  "WizardFooter",
  "WizardFooterProps",
  "WizardFooterWrapper",
  "WizardFooterWrapperProps",
  "useWizardFooter",
  "WizardHeader",
  "WizardHeaderProps",
  "WizardNav",
  "WizardNavProps",
  "WizardNavItem",
  "WizardNavItemProps",
  "WizardStep",
  "WizardStepProps",
  "WizardToggle",
  "WizardToggleProps",
];
const fromPackage = "@patternfly/react-core/next";
const toPackage = "@patternfly/react-core";
const messageAfterSpecifierPathChange =
  "been promoted as our default implementation. Running the fix flag will update your imports and/or exports.";

// https://github.com/patternfly/patternfly-react/pull/8854
module.exports = {
  meta: { fixable: "code" },
  create: moveSpecifiers(
    specifiersToMove,
    fromPackage,
    toPackage,
    messageAfterSpecifierPathChange
  ),
};
