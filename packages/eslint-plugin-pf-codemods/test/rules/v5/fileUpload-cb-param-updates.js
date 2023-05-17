const { addCallbackParamTester } = require("../../testHelpers");

addCallbackParamTester(
  "fileUpload-cb-param-updates",
  ["FileUploadField", "FileUpload"],
  "onTextChange"
);
