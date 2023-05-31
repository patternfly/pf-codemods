// https://github.com/patternfly/patternfly-react/pull/8892
const { moveSpecifiers } = require("../../helpers");

const specifiersToMove = ["TableBody", "TableHeader", "TableProps", "Table"];
const fromPackage = "@patternfly/react-table";
const toPackage = "@patternfly/react-table/deprecated";
const messageAfterSpecifierPathChange =
  "been deprecated. Running the fix flag will update your imports and/or exports to our deprecated package, but we suggest using our composable Table implementation.";

module.exports = {
  meta: { fixable: "code" },
  create: moveSpecifiers(
    specifiersToMove,
    fromPackage,
    toPackage,
    messageAfterSpecifierPathChange
  ),
};
