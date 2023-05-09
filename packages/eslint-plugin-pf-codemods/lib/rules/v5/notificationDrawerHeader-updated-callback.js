const { addCallbackParam } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/9010
module.exports = {
  meta: { fixable: "code" },
  create: addCallbackParam(["NotificationDrawerHeader"], { onClose: "_event" }),
};
