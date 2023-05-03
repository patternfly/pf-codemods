const { renameProps } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/4014
module.exports = {
  meta: { fixable: "code" },
  create: renameProps({
    WizardNavItem: {
      text: "content",
    },
  }),
};
