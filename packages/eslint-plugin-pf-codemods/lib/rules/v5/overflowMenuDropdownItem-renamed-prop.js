const { renameProp } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8359
module.exports = {
  meta: { fixable: "code" },
  create: renameProp(
    "OverflowMenuDropdownItem",
    { index: "itemId" },
    (node) =>
      `The "index" prop for ${node.name.name} has been renamed to "itemId", and its type has been updated to either a number or string.`
  ),
};
