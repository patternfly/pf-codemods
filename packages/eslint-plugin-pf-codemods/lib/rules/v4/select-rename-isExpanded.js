const { renameProps } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/3945
module.exports = {
  meta: { fixable: "code" },
  create: renameProps({
    Select: {
      isExpanded: "isOpen",
    },
  }),
};
