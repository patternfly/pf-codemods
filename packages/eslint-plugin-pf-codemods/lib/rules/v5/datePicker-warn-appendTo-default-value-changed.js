const { getPackageImports } = require("../../helpers");

  // https://github.com/patternfly/patternfly-react/pull/8636
  module.exports = {
    meta: {},
    create: function (context) {
      const imports = getPackageImports(
        context,
        "@patternfly/react-core"
      ).filter((specifier) => specifier.imported.name === "DatePicker");

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
