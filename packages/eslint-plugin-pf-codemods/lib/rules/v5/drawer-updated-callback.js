const { addCallbackParam } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8736
module.exports = {
  meta: { fixable: "code" },
  create: addCallbackParam(["DrawerPanelContent"], { onResize: "event" }),
};
