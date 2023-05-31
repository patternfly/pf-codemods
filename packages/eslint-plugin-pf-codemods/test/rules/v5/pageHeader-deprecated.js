const { createMoveSpecifiersTester } = require("../../testHelpers");

const specifiersToMove = [
  "PageHeader",
  "PageHeaderTools",
  "PageHeaderToolsGroup",
  "PageHeaderToolsItem",
  "PageHeaderProps",
  "PageHeaderToolsProps",
  "PageHeaderToolsGroupProps",
  "PageHeaderToolsItemProps",
];

createMoveSpecifiersTester(
  "pageHeader-deprecated",
  specifiersToMove,
  "Masthead"
);
