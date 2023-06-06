const { moveSpecifiers } = require("../../helpers");

const specifiersToMove = [
  "BadgeToggle",
  "BadgeToggleProps",
  "Dropdown",
  "DropdownProps",
  "DropdownPosition",
  "DropdownDirection",
  "DropdownContext",
  "DropdownArrowContext",
  "DropdownGroup",
  "DropdownGroupProps",
  "DropdownItem",
  "DropdownItemProps",
  "DropdownMenu",
  "DropdownMenuProps",
  "DropdownMenuItem",
  "DropdownSeparator",
  "SeparatorProps",
  "DropdownToggle",
  "DropdownToggleProps",
  "DropdownToggleAction",
  "DropdownToggleActionProps",
  "DropdownToggleCheckbox",
  "DropdownToggleCheckboxProps",
  "DropdownWithContext",
  "KebabToggle",
  "KebabToggleProps"
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
