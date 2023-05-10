const { addCallbackParam } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/9067
module.exports = {
  meta: { fixable: "code" },
  create: addCallbackParam(["ToggleGroupItem"], { onChange: { defaultParamName: "_event", previousParamIndex: 1, otherMatchers: /^_?(ev\w*|e$)/ } }),
};
