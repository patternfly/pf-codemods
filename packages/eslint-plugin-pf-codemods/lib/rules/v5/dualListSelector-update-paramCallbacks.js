const { addCallbackParam } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8793
module.exports = {
  meta: { fixable: "code" },
  create: addCallbackParam(["DualListSelector"], {
    onAvailableOptionsSearchInputChanged: {
      defaultParamName: "_event",
      previousParamIndex: 1,
      otherMatchers: /^_?(ev\w*|e$)/,
    },
    onChosenOptionsSearchInputChanged: {
      defaultParamName: "_event",
      previousParamIndex: 1,
      otherMatchers: /^_?(ev\w*|e$)/,
    },
    onListChange: "_event",
  }),
};
