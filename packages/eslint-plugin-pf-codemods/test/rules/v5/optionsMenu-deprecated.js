const { createMoveSpecifiersTester } = require("../../testHelpers");
const specifiersToMove = [
  { name: "OptionsMenu", type: "component" },
  { name: "OptionsMenuToggle", type: "component" },
  { name: "OptionsMenuItemGroup", type: "component" },
  { name: "OptionsMenuItem", type: "component" },
  { name: "OptionsMenuSeparator", type: "component" },
  { name: "OptionsMenuToggleWithText", type: "component" },
];

createMoveSpecifiersTester(
  "optionsMenu-deprecated",
  specifiersToMove,
  "new Dropdown or Select"
);
