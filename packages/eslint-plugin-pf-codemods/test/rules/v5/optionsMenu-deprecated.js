const { createMoveSpecifiersTester } = require("../../testHelpers");
const specifiersToMove = [
  "OptionsMenu",
  "OptionsMenuProps",
  "OptionsMenuToggle",
  "OptionsMenuToggleProps",
  "OptionsMenuItemGroup",
  "OptionsMenuItemGroupProps",
  "OptionsMenuItem",
  "OptionsMenuItemProps",
  "OptionsMenuSeparator",
  "OptionsMenuToggleWithText",
  "OptionsMenuPosition",
  "OptionsMenuDirection",
  "OptionsMenuToggleWithTextProps"
];

createMoveSpecifiersTester(
  "optionsMenu-deprecated",
  specifiersToMove,
  "new Dropdown or Select"
);
