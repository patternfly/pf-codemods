const { getFromPackage } = require("../../helpers");

  // https://github.com/patternfly/patternfly-react/pull/8636
  module.exports = {
    meta: {},
    create: function (context) {
      const imports = getFromPackage(
        context,
        "@patternfly/react-core"
      ).imports.filter((specifier) => specifier.imported.name === "DatePicker");

      return imports.length === 0
        ? {}
        : {
            JSXOpeningElement(node) {
              if (
                imports
                  .map((imp) => imp.local.name)
                  .includes(node.name.name)
              ) {
                context.report({
                  node,
                  message: 'The default value of the DatePicker prop "appendTo" has been updated to a value of "inline" and may cause markup changes that require updating selectors used in tests.',
                });
              }
            },
          };
    },
  };
