const { renameProps } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8619
module.exports = {
  meta: { fixable: "code" },
  create: renameProps({
    ClipboardCopy: {
      switchDelay: "",
    },
  }),
};
