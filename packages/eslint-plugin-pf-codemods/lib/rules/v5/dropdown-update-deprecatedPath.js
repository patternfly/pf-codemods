const { moveSpecifiers } = require("../../helpers");

const importNamesToMove = [
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
const toPackage = "@patternfly/react-core/deprecated"
const aliasSuffix = "Deprecated";
const messageAfterImportNameList = "been deprecated. Running the fix flag will update your imports to our deprecated package, but we suggest using our new Dropdown implementation.";
const messageAfterElementNameChange = "has been deprecated. Running the fix flag will update component names, but we suggest using our new Dropdown implementation.";

// https://github.com/patternfly/patternfly-react/pull/8835
module.exports = {
  meta: { fixable: "code" },
  create: moveSpecifiers(
    importNamesToMove,
    fromPackage,
    toPackage,
    messageAfterImportNameList,
    aliasSuffix,
    messageAfterElementNameChange
  ),
};
