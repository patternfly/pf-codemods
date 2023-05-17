const { addCallbackParam } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/9061
module.exports = {
  meta: { fixable: "code" },
  create: addCallbackParam(["TextArea"], { onChange: { defaultParamName: "_event", previousParamIndex: 1, otherMatchers: /^_?(ev\w*|e$)/ } }),
};
