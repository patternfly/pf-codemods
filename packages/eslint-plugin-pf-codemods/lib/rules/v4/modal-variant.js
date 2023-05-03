const { renameProps } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/3920
module.exports = {
  meta: { fixable: "code" },
  create: renameProps({
    Modal: {
      isSmall: {
        newName: 'variant="small"',
        replace: true,
      },
      isLarge: {
        newName: 'variant="large"',
        replace: true,
      },
    },
  }),
};
