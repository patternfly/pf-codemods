const { addCallbackParam } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8793
module.exports = {
  meta: { fixable: "code" },
  create: addCallbackParam(["DualListSelector"], { onChosenOptionsSearchInputChanged: { defaultParamName: "_event", previousParamIndex: 1, otherMatchers: /^_?(ev\w*|e$)/ } }),
};
