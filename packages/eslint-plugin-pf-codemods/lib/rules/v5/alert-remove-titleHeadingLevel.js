const { renameProps } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8518
module.exports = {
  meta: { fixable: "code" },
  create: renameProps({
    Alert: {
      titleHeadingLevel: "component",
    },
  }),
};
