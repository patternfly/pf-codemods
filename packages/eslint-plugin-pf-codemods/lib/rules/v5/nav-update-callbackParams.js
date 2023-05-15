const { addCallbackParam } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8997
module.exports = {
  meta: { fixable: "code" },
  create: addCallbackParam(
    ["Nav"],
    { onSelect: "_event", onToggle: "_event" },
    (propName, componentName, paramName) =>
      `The "${propName}" prop for ${componentName} has been updated so that the "${paramName}" parameter is the first parameter, and has been removed from the ${propName
        .slice(2)
        .toLowerCase()}edItem object parameter. "${propName}" handlers may require an update.`
  ),
};
