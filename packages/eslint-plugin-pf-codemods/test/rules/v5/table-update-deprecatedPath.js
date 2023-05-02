const { createMoveSpecifiersTester } = require("../../testHelpers");

const importsToMove = [
  { name: "TableBody", type: "component" },
  { name: "TableHeader", type: "component" },
  { name: "TableProps", type: "component" },
  { name: "Table", type: "component" },
];

  const ruleTester = require("../../ruletester");
  const rule = require("../../../lib/rules/v5/table-update-deprecatedPath");

  
  createMoveSpecifiersTester(
    "table-update-deprecatedPath",
    importsToMove,
    "composable Table"
  );