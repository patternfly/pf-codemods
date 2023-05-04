const { moveSpecifiers } = require("../../helpers");

const importsToMove = [
  { name: "Select", type: "component" },
  { name: "SelectOption", type: "component" },
  { name: "SelectToggle", type: "component" },
  { name: "SelectMenu", type: "component" },
  { name: "SelectGroup", type: "component" },
  { name: "SelectViewMoreObject", type: "interface" },
  { name: "SelectProps", type: "interface" },
  { name: "SelectState", type: "interface" },
  { name: "SelectContextInterface", type: "interface" },
  { name: "SelectGroupProps", type: "interface" },
  { name: "SelectMenuProps", type: "interface" },
  { name: "SelectOptionObject", type: "interface" },
  { name: "SelectOptionProps", type: "interface" },
  { name: "SelectToggleProps", type: "interface" },
  { name: "SelectContext", type: "" },
  { name: "SelectProvider", type: "" },
  { name: "SelectConsumer", type: "" },
  { name: "SelectVariant", type: "" },
  { name: "SelectPosition", type: "" },
  { name: "SelectDirection", type: "" },
  { name: "SelectFooterTabbableItems", type: "" },
];

const fromPackage = "@patternfly/react-core";
const toPackage = "@patternfly/react-core/deprecated";
const aliasSuffix = "Deprecated";
const messageAfterImportNameChange =
  "been deprecated. Running the fix flag will update your imports to our deprecated package, but we suggest using our new Select implementation.";
const messageAfterElementNameChange =
  "has been deprecated. Running the fix flag will update names, but we suggest using our new Select implementation.";

// https://github.com/patternfly/patternfly-react/pull/8825
module.exports = {
  meta: { fixable: "code" },
  create: moveSpecifiers(
    importsToMove,
    fromPackage,
    toPackage,
    messageAfterImportNameChange,
    messageAfterElementNameChange,
    aliasSuffix
  ),
};
