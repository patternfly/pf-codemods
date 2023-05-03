const { renameProps } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8359
module.exports = {
  meta: { fixable: "code" },
  create: renameProps({
    OverflowMenuDropdownItem: {
      index: {
        newName: "itemId",
        message: (node) =>
          `the "index" prop for ${node.name.name} has been renamed to "itemId", and its type has been updated to either a number or string.`,
      },
    },
  }),
};
