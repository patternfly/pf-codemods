const { createMoveSpecifiersTester } = require("../../testHelpers");

const specifiersToMove = ["TableBody", "TableHeader", "TableProps", "Table"];

createMoveSpecifiersTester(
  "table-update-deprecatedPath",
  specifiersToMove,
  "composable Table"
);
