const { createMoveSpecifiersTester } = require("../../testHelpers");
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

createMoveSpecifiersTester(
  "dropdown-update-deprecatedPath",
  specifiersToMove,
  "new Dropdown"
);
