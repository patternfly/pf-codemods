const { moveSpecifiers } = require("../../helpers");

const specifiersToMove = [
  "Select",
  "SelectOption",
  "SelectToggle",
  "SelectMenu",
  "SelectGroup",
  "SelectViewMoreObject",
  "SelectProps",
  "SelectState",
  "SelectContextInterface",
  "SelectGroupProps",
  "SelectMenuProps",
  "SelectOptionObject",
  "SelectOptionProps",
  "SelectToggleProps",
  "SelectContext",
  "SelectProvider",
  "SelectConsumer",
  "SelectVariant",
  "SelectPosition",
  "SelectDirection",
  "SelectFooterTabbableItems",
];
const fromPackage = "@patternfly/react-core";
const toPackage = "@patternfly/react-core/deprecated";
const messageAfterSpecifierPathChange =
  "been deprecated. Running the fix flag will update your imports and/or exports to our deprecated package, but we suggest using our new Select implementation.";

// https://github.com/patternfly/patternfly-react/pull/8825
module.exports = {
  meta: { fixable: "code" },
  create: moveSpecifiers(
    specifiersToMove,
    fromPackage,
    toPackage,
    messageAfterSpecifierPathChange
  ),
};
