const { renameProps } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/4065
module.exports = {
  meta: { fixable: "code" },
  create: renameProps({
    EmptyStateIcon: {
      size: {
        newName: "",
        message: (node) =>
          `Removed prop size from ${node.name.name}. Use the icon prop instead.`,
      },
      title: {
        newName: "",
        message: (node) =>
          `Removed prop title from ${node.name.name}. Use the icon prop instead.`,
      },
    },
  }),
};
