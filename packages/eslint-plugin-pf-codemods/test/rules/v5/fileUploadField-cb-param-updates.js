const { addCallbackParamTester } = require("../../testHelpers");

addCallbackParamTester(
  "fileUploadField-cb-param-updates",
  ["FileUploadField", "FileUpload"],
  "onTextChange"
);
