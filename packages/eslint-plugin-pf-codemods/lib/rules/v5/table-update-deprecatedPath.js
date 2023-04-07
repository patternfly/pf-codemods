// https://github.com/patternfly/patternfly-react/pull/8892
const { moveSpecifiers } = require("../../helpers");

const importsToMove = [
  { name: "TableBody", type: "component" },
  { name: "TableHeader", type: "component" },
  { name: "TableProps", type: "component" },
  { name: "Table", type: "component" },
];
const fromPackage = "@patternfly/react-table";
const toPackage = "@patternfly/react-table/deprecated";
const aliasSuffix = "Deprecated";
const messageAfterImportNameChange =
  "been deprecated. Running the fix flag will update your imports to our deprecated package, but we suggest using our composable Table implementation.";
const messageAfterElementNameChange =
  "has been deprecated. Running the fix flag will update names, but we suggest using our composable Table implementation.";

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