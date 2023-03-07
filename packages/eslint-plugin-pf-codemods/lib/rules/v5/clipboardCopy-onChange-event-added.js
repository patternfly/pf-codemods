const { addCallbackParam } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8747
module.exports = {
  meta: { fixable: "code" },
  create: addCallbackParam(["ClipboardCopy"], { onChange: "_event" }),
};
