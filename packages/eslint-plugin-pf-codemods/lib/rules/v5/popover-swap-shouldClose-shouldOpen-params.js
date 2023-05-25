const { addCallbackParam } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/9054
module.exports = {
  meta: { fixable: "code" },
  create: addCallbackParam(["Popover"], {
    shouldClose: {
      defaultParamName: "_event",
      previousParamIndex: 2,
      otherMatchers: /^_?(ev\w*|e$)/,
    },
    shouldOpen: {
      defaultParamName: "_event",
      previousParamIndex: 1,
      otherMatchers: /^_?(ev\w*|e$)/,
    },
  }),
};
