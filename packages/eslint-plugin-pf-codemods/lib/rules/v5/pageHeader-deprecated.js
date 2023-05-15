const { moveSpecifiers } = require("../../helpers");

const importsToMove = [
  { name: "PageHeader", type: "component" },
  { name: "PageHeaderTools", type: "component" },
  { name: "PageHeaderToolsGroup", type: "component" },
  { name: "PageHeaderToolsItem", type: "component" },
  { name: "PageHeaderProps", type: "interface" },
  { name: "PageHeaderToolsProps", type: "interface" },
  { name: "PageHeaderToolsGroupProps", type: "interface" },
  { name: "PageHeaderToolsItemProps", type: "interface" },
];

const fromPackage = "@patternfly/react-core";
const toPackage = "@patternfly/react-core/deprecated";
const aliasSuffix = "Deprecated";
const messageAfterImportNameChange =
  "been deprecated. Running the fix flag will update your imports to our deprecated package, but we suggest using our Masthead implementation.";
const messageAfterElementNameChange =
  "has been deprecated. Running the fix flag will update names, but we suggest using our Masthead implementation.";

// https://github.com/patternfly/patternfly-react/pull/8854
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
