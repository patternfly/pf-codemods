const { renameProps } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8517
module.exports = {
  meta: { fixable: "code" },
  create: renameProps({
    Tabs: {
      hasSecondaryBorderBottom: "",
    },
  }),
};
