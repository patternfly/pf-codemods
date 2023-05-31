const { createMoveSpecifiersTester } = require("../../testHelpers");

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

createMoveSpecifiersTester("select-deprecated", specifiersToMove, "new Select");
