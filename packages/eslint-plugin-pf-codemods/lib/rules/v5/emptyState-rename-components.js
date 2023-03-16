const { renameComponents } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8737
module.exports = {
  meta: { fixable: "code" },
  create: renameComponents({
    "EmptyStatePrimary": "EmptyStateActions",
    "EmptyStateSecondaryActions": "EmptyStateActions",
  }),
};
