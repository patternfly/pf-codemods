const { renameProps } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8199
module.exports = {
  meta: { fixable: "code" },
  create: renameProps({
    Divider: {
      isVertical: {
        newName: `orientation={{ default: 'vertical' }}`,
        replace: true,
        message: (node) =>
          `isVertical prop has been removed for ${node.name.name} and replaced with the orientation prop, which can specify verticality at various breakpoints.`,
      },
    },
  }),
};
