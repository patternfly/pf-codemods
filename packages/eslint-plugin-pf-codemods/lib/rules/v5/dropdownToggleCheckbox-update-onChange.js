const { addCallbackParam } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8787
module.exports = {
  meta: { fixable: "code" },
  create: addCallbackParam(["DropdownToggleCheckbox"], {
    onChange:{
      defaultParamName: "_event",
      previousParamIndex: 1,
      otherMatchers: /^_?(ev\w*|e$)/,
    },
  }),
};
