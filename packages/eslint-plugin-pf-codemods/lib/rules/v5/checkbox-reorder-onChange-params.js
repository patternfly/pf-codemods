const { addCallbackParam } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8750
module.exports = {
  meta: { fixable: "code" },
  create: addCallbackParam(["Checkbox"], {
    onChange: {
      defaultParamName: "_event",
      previousParamIndex: 1,
      otherMatchers: /^_?(ev\w*|e$)/,
    },
  }),
};
