const { addCallbackParam } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/434
module.exports = {
  meta: { fixable: "code" },
  create: addCallbackParam(["Switch"], { onChange: { defaultParamName: "_event", previousParamIndex: 1, otherMatchers: /^_?(ev\w*|e$)/ } }),
};
