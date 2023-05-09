const { addCallbackParam } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/9011
module.exports = {
  meta: { fixable: "code" },
  create: addCallbackParam(["Page"], { onPageResize: "_event" }),
};
