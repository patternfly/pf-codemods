const { moveSpecifiers } = require("../../helpers");

const specifiersToMove = [
  "BadgeToggle",
  "Dropdown",
  "DropdownPosition",
  "DropdownDirection",
  "DropdownContext",
  "DropdownArrowContext",
  "DropdownGroup",
  "DropdownItem",
  "DropdownMenu",
  "DropdownSeparator",
  "DropdownToggle",
  "DropdownToggleAction",
  "DropdownToggleCheckbox",
  "DropdownWithContext",
  "KebabToggle",
];
const fromPackage = "@patternfly/react-core";
const toPackage = "@patternfly/react-core/deprecated";
const messageAfterSpecifierPathChange =
  "been deprecated. Running the fix flag will update your imports and/or exports to our deprecated package, but we suggest using our new Dropdown implementation.";

// https://github.com/patternfly/patternfly-react/pull/8835
module.exports = {
  meta: { fixable: "code" },
  create: moveSpecifiers(
    specifiersToMove,
    fromPackage,
    toPackage,
    messageAfterSpecifierPathChange
  ),
};
