const { createMoveSpecifiersTester } = require("../../testHelpers");

const specifiersToMove = [
  { name: "PageHeader", type: "component" },
  { name: "PageHeaderTools", type: "component" },
  { name: "PageHeaderToolsGroup", type: "component" },
  { name: "PageHeaderToolsItem", type: "component" },
  { name: "PageHeaderProps", type: "interface" },
  { name: "PageHeaderToolsProps", type: "interface" },
  { name: "PageHeaderToolsGroupProps", type: "interface" },
  { name: "PageHeaderToolsItemProps", type: "interface" },
];

createMoveSpecifiersTester(
  "pageHeader-deprecated",
  specifiersToMove,
  "Masthead"
);
