const { addCallbackParamTester } = require("../../testHelpers");

addCallbackParamTester(
  "nav-update-callbackParams",
  "Nav",
  ["onSelect", "onToggle"],
  "_event",
  (componentName, propName, newParamName) =>
    `The "${propName}" prop for ${componentName} has been updated so that the "${newParamName}" parameter is the first parameter, and has been removed from the ${propName
      .slice(2)
      .toLowerCase()}edItem object parameter. "${propName}" handlers may require an update.`
);
