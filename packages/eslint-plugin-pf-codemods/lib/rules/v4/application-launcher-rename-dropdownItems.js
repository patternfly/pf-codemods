const { renameProps } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/3929
module.exports = {
  meta: { fixable: "code" },
  create: renameProps({
    ApplicationLauncher: {
      dropdownItems: {
        newName: "items",
      },
    },
  }),
};
