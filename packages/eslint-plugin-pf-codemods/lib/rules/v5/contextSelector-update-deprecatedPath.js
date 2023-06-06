const { moveSpecifiers } = require("../../helpers");

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
const fromPackage = "@patternfly/react-core";
const toPackage = "@patternfly/react-core/deprecated";
const messageAfterSpecifierPathChange =
  "been deprecated. Running the fix flag will update your imports and/or exports to our deprecated package, but we suggest using our composable Menu implementation.";

// https://github.com/patternfly/patternfly-react/pull/8840
module.exports = {
  meta: { fixable: "code" },
  create: moveSpecifiers(
    specifiersToMove,
    fromPackage,
    toPackage,
    messageAfterSpecifierPathChange
  ),
};
