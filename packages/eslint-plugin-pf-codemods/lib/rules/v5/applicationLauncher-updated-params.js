const { addCallbackParam } = require("../../helpers");

  // https://github.com/patternfly/patternfly-react/pull/8756
  module.exports = {
    meta: { fixable: "code" },
    create: addCallbackParam(["ApplicationLauncher"], { onFavorite: "_event", onSearch: "_event" }),
  };
