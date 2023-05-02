const { addCallbackParamTester } = require("../../testHelpers");

addCallbackParamTester(
  "fileUpload-event-params-added-to-callbacks",
  "FileUpload",
  ["onDataChange", "onReadFailed", "onReadFinished", "onReadStarted"]
);
