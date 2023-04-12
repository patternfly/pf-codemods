const { addCallbackParam } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/1234
module.exports = {
  meta: { fixable: "code" },
  create: addCallbackParam(["FileUploadField"], { onTextChange: "_event" }),
};
