const { addCallbackParam } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8827
module.exports = {
  meta: { fixable: "code" },
  create: addCallbackParam(["DataList"], { onSelectableRowChange: { defaultParamName: "_event", previousParamIndex: 1, otherMatchers: /^_?(ev\w*|e$)/ } }),
};
