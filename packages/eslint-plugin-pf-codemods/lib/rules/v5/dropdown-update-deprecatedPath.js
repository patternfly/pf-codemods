const { moveSpecifiers } = require("../../helpers");

const specifiersToMove = [
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
const fromPackage = "@patternfly/react-core";
const toPackage = "@patternfly/react-core/deprecated";
const aliasSuffix = "Deprecated";
const messageAfterSpecifierPathChange =
  "been deprecated. Running the fix flag will update your imports and/or exports to our deprecated package, but we suggest using our new Dropdown implementation.";
const messageAfterElementNameChange =
  "has been deprecated. Running the fix flag will update names, but we suggest using our new Dropdown implementation.";

// https://github.com/patternfly/patternfly-react/pull/8835
module.exports = {
  meta: { fixable: "code" },
  create: moveSpecifiers(
    specifiersToMove,
    fromPackage,
    toPackage,
    messageAfterSpecifierPathChange,
    messageAfterElementNameChange,
    aliasSuffix
  ),
};
