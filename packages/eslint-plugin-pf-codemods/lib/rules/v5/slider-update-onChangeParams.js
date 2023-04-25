const { addCallbackParam } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8970
module.exports = {
  meta: { fixable: "code" },
  create: addCallbackParam(["Slider"], { onChange: "_event" }),
};
