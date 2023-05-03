const {getPackageImports} = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/5275
module.exports = {
  meta: {fixable: "code"},
  create: function (context) {
    const imports = getPackageImports(context, "@patternfly/react-icons");

    const iconImport = imports.filter((specifier) =>
      specifier.imported.name.includes("Icon")
    );
    return imports.length === 0
      ? {}
      : {
          JSXOpeningElement(node) {
            if (
              iconImport &&
              node.attributes.find(
                (a) =>
                  a.name?.name === "size" ||
                  a.name?.name === "color" ||
                  a.name?.name === "noVerticalAlign"
              )
            ) {
              context.report({
                node,
                message:
                  "The size, color, and noVerticalAlign properties have been removed from react-icons. Wrap your react-icon with the <Icon> component to customize its size and color.",
              });
            }
          },
        };
  },
};
