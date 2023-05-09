const { addCallbackParam } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8998
module.exports = {
  meta: { fixable: "code" },
  create: addCallbackParam(["FormSelect"], { onChange: { defaultParamName: "_event", previousParamIndex: 1, otherMatchers: /^_?(ev\w*|e$)/ } }),
};
