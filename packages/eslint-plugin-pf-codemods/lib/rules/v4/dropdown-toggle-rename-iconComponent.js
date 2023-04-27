const { renameProps } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/4038
module.exports = {
  meta: { fixable: "code" },
  create: renameProps({
    DropdownToggle: {
      iconComponent: {
        newName: "toggleIndicator",
      },
    },
  }),
};
