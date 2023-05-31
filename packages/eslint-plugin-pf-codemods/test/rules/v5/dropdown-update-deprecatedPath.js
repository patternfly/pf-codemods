const { createMoveSpecifiersTester } = require("../../testHelpers");
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

createMoveSpecifiersTester(
  "dropdown-update-deprecatedPath",
  specifiersToMove,
  "new Dropdown"
);
