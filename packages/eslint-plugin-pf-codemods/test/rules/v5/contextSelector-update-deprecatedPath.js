const { createMoveSpecifiersTester } = require("../../testHelpers");
const specifiersToMove = [
  "ContextSelector",
  "ContextSelectorProps",
  "ContextSelectorContext",
  "ContextSelectorItem",
  "ContextSelectorItemProps",
  "ContextSelectorFooter",
  "ContextSelectorFooterProps",
  "ContextSelectorMenuList",
  "ContextSelectorMenuListProps",
  "ContextSelectorToggle",
  "ContextSelectorToggleProps"
];

createMoveSpecifiersTester(
  "contextSelector-update-deprecatedPath",
  specifiersToMove,
  "composable Menu"
);
