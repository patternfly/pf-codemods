const { createMoveSpecifiersTester } = require("../../testHelpers");

const importsToMove = [
  { name: "Select", type: "component" },
  { name: "SelectOption", type: "component" },
  { name: "SelectToggle", type: "component" },
  { name: "SelectMenu", type: "component" },
  { name: "SelectGroup", type: "component" },
  { name: "SelectContext", type: "" },
  { name: "SelectProvider", type: "" },
  { name: "SelectConsumer", type: "" },
  { name: "SelectVariant", type: "" },
  { name: "SelectPosition", type: "" },
  { name: "SelectDirection", type: "" },
  { name: "SelectFooterTabbableItems", type: "" },
];

createMoveSpecifiersTester("select-deprecated", importsToMove, null);
