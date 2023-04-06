const { addCallbackParam } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8793
module.exports = {
  meta: { fixable: "code" },
  create: addCallbackParam(["DualListSelector"], { onListChange: "_event" }),
};
