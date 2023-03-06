const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8736
module.exports = {
  meta: {},
  create: function (context) {
    const imports = getPackageImports(context, "@patternfly/react-core").filter(
      (specifier) => specifier.imported.name === "Drawer"
    );

    return imports.length === 0
      ? {}
      : {
          JSXOpeningElement(node) {
            if (
              imports.map((imp) => imp.local.name).includes(node.name.name) &&
              node.attributes.find((attr) => attr.name.name === "onResize")
            ) {
              context.report({
                node,
                message: `The "onResize" prop for Drawer has been updated to include the event parameter as its first parameter. "onResize" handlers may require an update.`,
              });
            }
          },
        };
  },
};
