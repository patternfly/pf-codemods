const { addCallbackParam } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8752
module.exports = {
  meta: { fixable: "code" },
  create: addCallbackParam(["Card"], {
    onSelectableInputChange: {
      defaultParamName: "_event",
      previousParamIndex: 1,
      otherMatchers: /^_?(ev\w*|e$)/,
    },
  }),
};
