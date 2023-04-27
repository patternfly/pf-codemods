const { renameProps } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/4116
module.exports = {
  meta: { fixable: "code" },
  create: renameProps({
    Label: {
      isCompact: {
        newName: "",
      },
    },
  }),
};
