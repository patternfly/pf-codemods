const { createMoveSpecifiersTester } = require("../../testHelpers");
const specifiersToMove = [
  "ContextSelector",
  "ContextSelectorProps",
  "ContextSelectorItem",
  "ContextSelectorItemProps",
  "ContextSelectorFooter",
  "ContextSelectorFooterProps",
];

createMoveSpecifiersTester(
  "contextSelector-update-deprecatedPath",
  specifiersToMove,
  "composable Menu"
);
