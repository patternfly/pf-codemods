const { addCallbackParam } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8882
module.exports = {
  meta: { fixable: "code" },
  create: addCallbackParam(["FileUploadField", "FileUpload"], { onTextChange: "_event" }),
};
