const { createMoveSpecifiersTester } = require("../../testHelpers");
const specifiersToMove = [
  "ContextSelector",
  "ContextSelectorItem",
  "ContextSelectorFooter",
];

createMoveSpecifiersTester(
  "contextSelector-update-deprecatedPath",
  specifiersToMove,
  "composable Menu"
);
