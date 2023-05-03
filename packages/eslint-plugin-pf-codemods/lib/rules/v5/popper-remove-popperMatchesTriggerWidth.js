const { renameProps } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8724
module.exports = {
  meta: { fixable: "code" },
  create: renameProps({
    Popper: {
      popperMatchesTriggerWidth: {
        newName: "",
        message: (node) =>
          `popperMatchesTriggerWidth prop has been removed for ${node.name.name}. The width can instead be modified via the new minWidth, maxWidth, and width properties`,
      },
    },
  }),
};
