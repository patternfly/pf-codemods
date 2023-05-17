const { addCallbackParam } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/9057
module.exports = {
  meta: { fixable: "code" },
  create: addCallbackParam(["EditableSelectInputCell"], {
    onSelect: {
      defaultParamName: "_event",
      previousParamIndex: 1,
      otherMatchers: /^_?(ev\w*|e$)/,
    },
    clearSelection: "_event",
  }),
};
