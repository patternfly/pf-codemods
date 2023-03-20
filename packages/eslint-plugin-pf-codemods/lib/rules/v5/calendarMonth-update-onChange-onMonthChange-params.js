const { addCallbackParam } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8753
module.exports = {
  meta: { fixable: "code" },
  create: addCallbackParam(["CalendarMonth"], {
    onMonthChange: {
      defaultParamName: "_event",
      previousParamIndex: 1,
      otherMatchers: /^_?(ev\w*|e$)/,
    },
    onChange: "_event"
  }),
};
