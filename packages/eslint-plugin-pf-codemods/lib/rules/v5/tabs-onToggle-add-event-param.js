const { addCallbackParam } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/9059
module.exports = {
  meta: { fixable: "code" },
  create: addCallbackParam(["Tabs"], { onToggle: "_event" }),
};
