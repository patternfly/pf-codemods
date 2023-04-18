const { addCallbackParam } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8880
module.exports = {
  meta: { fixable: "code" },
  create: addCallbackParam(["ExpandableSection"], { onToggle: "_event" }),
};
