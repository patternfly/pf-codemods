const { addCallbackParam } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8960
module.exports = {
  meta: { fixable: "code" },
  create: addCallbackParam(["FileUpload"], {
    onDataChange: "_event",
    onReadFailed: "_event",
    onReadFinished: "_event",
    onReadStarted: "_event",
  }),
};
