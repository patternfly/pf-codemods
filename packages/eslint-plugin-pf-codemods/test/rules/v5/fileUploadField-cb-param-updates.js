const {
  addCallbackParamTester,
  swapCallbackParamTester,
} = require("../../testHelpers");

addCallbackParamTester(
  "fileUploadField-cb-param-updates",
  "FileUploadField",
  "onTextChange"
);
swapCallbackParamTester(
  "fileUploadField-cb-param-updates",
  "FileUploadField",
  "onChange",
  2
);
