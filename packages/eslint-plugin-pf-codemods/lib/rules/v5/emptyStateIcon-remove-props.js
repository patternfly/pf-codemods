const { renameProps } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8737
module.exports = {
  meta: { fixable: "code" },
  create: renameProps({
    "EmptyStateIcon": {
      "component": "icon",
      "variant": ""
    },
  }),
};
