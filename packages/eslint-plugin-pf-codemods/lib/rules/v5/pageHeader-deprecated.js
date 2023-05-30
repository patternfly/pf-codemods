const { moveSpecifiers } = require("../../helpers");

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

const fromPackage = "@patternfly/react-core";
const toPackage = "@patternfly/react-core/deprecated";

const messageAfterSpecifierPathChange =
  "been deprecated. Running the fix flag will update your imports and/or exports to our deprecated package, but we suggest using our Masthead implementation.";

// https://github.com/patternfly/patternfly-react/pull/8854
module.exports = {
  meta: { fixable: "code" },
  create: moveSpecifiers(
    specifiersToMove,
    fromPackage,
    toPackage,
    messageAfterSpecifierPathChange
  ),
};
