const { createMoveSpecifiersTester } = require("../../testHelpers");
const specifiersToMove = [
  "OptionsMenu",
  "OptionsMenuToggle",
  "OptionsMenuItemGroup",
  "OptionsMenuItem",
  "OptionsMenuSeparator",
  "OptionsMenuToggleWithText",
];

createMoveSpecifiersTester(
  "optionsMenu-deprecated",
  specifiersToMove,
  "new Dropdown or Select"
);
