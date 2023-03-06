const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8735
module.exports = {
  meta: {},
  create: function (context) {
    const imports = getPackageImports(context, "@patternfly/react-core").filter(
      (specifier) => specifier.imported.name === "DataListCheck"
    );

    return imports.length === 0
      ? {}
      : {
          JSXOpeningElement(node) {
            if (
              imports.map((imp) => imp.local.name).includes(node.name.name) &&
              node.attributes.find((attr) => attr.name.name === "onChange")
            ) {
              context.report({
                node,
                message: `The "onChange" prop for DataListCheck has been updated so that the event parameter is the first parameter. "onChange" handlers may require an update.`,
              });
            }
          },
        };
  },
};
