const { addCallbackParam } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8735
module.exports = {
  meta: { fixable: "code" },
  // create: addCallbackParam(["DataListCheck"], { onChange: "_event" }),
  create: addCallbackParam(["DataListCheck"], { onChange: { defaultParamName: "_event", previousParamIndex: 1, otherMatchers: /^_?(ev\w*|e$)/ } }),
};
