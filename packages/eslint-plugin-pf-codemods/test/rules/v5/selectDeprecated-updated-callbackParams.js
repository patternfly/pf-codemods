const { addCallbackParamTester } = require("../../testHelpers");

addCallbackParamTester("selectDeprecated-updated-callbackParams", "Select", [
  "onFavorite",
  "onCreateOption",
  "onTypeaheadInputChanged",
]);
