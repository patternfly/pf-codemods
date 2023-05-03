const { renameProps } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8132
module.exports = {
  meta: { fixable: "code" },
  create: renameProps({
    SimpleList: { isCurrent: "isActive" },
  }),
};
