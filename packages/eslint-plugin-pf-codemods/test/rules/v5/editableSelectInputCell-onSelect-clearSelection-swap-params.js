const {
  swapCallbackParamTester,
  addCallbackParamTester,
} = require("../../testHelpers");

swapCallbackParamTester(
  "editableSelectInputCell-onSelect-clearSelection-swap-params",
  "EditableSelectInputCell",
  "onSelect",
  1
);

addCallbackParamTester(
  "editableSelectInputCell-onSelect-clearSelection-swap-params",
  "EditableSelectInputCell",
  "clearSelection"
);
