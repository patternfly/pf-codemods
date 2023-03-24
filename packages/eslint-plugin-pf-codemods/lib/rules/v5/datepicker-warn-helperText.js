const { getPackageImports } = require("../../helpers");

  // https://github.com/patternfly/patternfly-react/pull/8833
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
                  && node.attributes.find(a => a.name.name === 'helperText')
              ) {
                context.report({
                  node,
                  message: 'The helperText property now accepts the <HelperText> component.',
                });
              }
            },
          };
    },
  };
