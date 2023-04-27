const { renameProps } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8771
module.exports = {
  meta: { fixable: "code" },
  create: renameProps({
    Label: {
      isTruncated: {
        newName: "",
        message: (node) =>
          `isTruncated prop has been removed for ${node.name.name}. This is now the default behavior. Note that there is also a new property (maxTextWidth) to customize when truncation will occur.`,
      },
    },
  }),
};
