const { createMoveSpecifiersTester } = require("../../testHelpers");
const specifiersToMove = [
  { name: "ContextSelector", type: "component" },
  { name: "ContextSelectorItem", type: "component" },
  { name: "ContextSelectorFooter", type: "component" },
];

createMoveSpecifiersTester(
  "contextSelector-update-deprecatedPath",
  specifiersToMove,
  "composable Menu"
);
