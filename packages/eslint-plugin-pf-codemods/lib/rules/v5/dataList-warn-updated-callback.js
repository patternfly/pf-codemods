const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8723
module.exports = {
  meta: {},
  create: function (context) {
    const imports = getPackageImports(context, "@patternfly/react-core").filter(
      (specifier) => specifier.imported.name === "DataList"
    );

    return imports.length === 0
      ? {}
      : {
          JSXOpeningElement(node) {
            if (
              imports.map((imp) => imp.local.name).includes(node.name.name) &&
              node.attributes.find(
                (attr) => attr.name.name === "onSelectDataListItem"
              )
            ) {
              context.report({
                node,
                message: `The "onSelectDataListItem" prop for DataList has been updated to include the event parameter as its first parameter. "onSelectDataListItem" handlers may require an update.`,
              });
            }
          },
        };
  },
};
