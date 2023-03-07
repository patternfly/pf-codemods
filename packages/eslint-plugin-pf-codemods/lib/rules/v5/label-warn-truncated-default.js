const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8771
module.exports = {
  meta: {},
  create: function (context) {
    const labelImport = getPackageImports(context, "@patternfly/react-core").find(
      (specifier) => specifier.imported.name === "Label"
    );

    return !labelImport
      ? {}
      : {
          JSXOpeningElement(node) {
            if ( (labelImport.local.name === node.name.name) &&
              !node.attributes.find(
                (attr) => attr.name.name === "isTruncated"
              )
            ) {
              context.report({
                node,
                message: `The ${node.name.name} component is now truncated by default. There is also a new property (textMaxWidth) to customize when truncation occurs. The DOM will be a little different and may require changes in your tests.`,
              });
            }
          },
        };
  },
};
