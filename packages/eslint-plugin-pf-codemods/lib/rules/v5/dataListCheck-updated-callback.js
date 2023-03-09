const { addCallbackParam } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8735
module.exports = {
  meta: { fixable: "code" },
  create: addCallbackParam(["DataListCheck"], { onChange: "_event" }),
};
