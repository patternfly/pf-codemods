const { createMoveSpecifiersTester } = require("../../testHelpers");
const importsToMove = [
  { name: "ContextSelector", type: "component" },
  { name: "ContextSelectorItem", type: "component" },
  { name: "ContextSelectorFooter", type: "component" },
];

createMoveSpecifiersTester(
  "contextSelector-update-deprecatedPath",
  importsToMove,
  "composable Menu"
);
