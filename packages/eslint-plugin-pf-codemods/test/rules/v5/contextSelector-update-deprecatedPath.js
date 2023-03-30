const { createMoveSpecifiersTester } = require("../../testHelpers");
const importsToMove = [
  { name: "BadgeToggle", type: "component" },
  { name: "Dropdown", type: "component" },
  { name: "DropdownPosition", type: "enum" },
  { name: "DropdownDirection", type: "enum" },
  { name: "DropdownContext", type: "component" },
  { name: "DropdownArrowContext", type: "component" },
  { name: "DropdownGroup", type: "component" },
  { name: "DropdownItem", type: "component" },
  { name: "DropdownMenu", type: "component" },
  { name: "DropdownSeparator", type: "component" },
  { name: "DropdownToggle", type: "component" },
  { name: "DropdownToggleAction", type: "component" },
  { name: "DropdownToggleCheckbox", type: "component" },
  { name: "DropdownWithContext", type: "component" },
  { name: "KebabToggle", type: "component" },
];

createMoveSpecifiersTester(
  "dropdown-update-deprecatedPath",
  importsToMove,
  "Dropdown"
);
