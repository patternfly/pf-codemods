const { addCallbackParam } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8967
module.exports = {
  meta: { fixable: "code" },
  create: addCallbackParam(["Select"], {
    onFavorite: "_event",
    onCreateOption: "_event",
    onTypeaheadInputChanged: "_event",
  }),
};
