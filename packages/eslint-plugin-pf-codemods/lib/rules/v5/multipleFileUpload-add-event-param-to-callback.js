const { addCallbackParam } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8995
module.exports = {
  meta: { fixable: "code" },
  create: addCallbackParam(["MultipleFileUpload"], { onFileDrop: "_event" }),
};
