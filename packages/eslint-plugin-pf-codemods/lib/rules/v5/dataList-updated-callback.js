const { addCallbackParam } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8723
module.exports = {
  meta: { fixable: "code" },
  create: addCallbackParam(["DataList"], { onSelectDataListItem: "_event" }),
};
