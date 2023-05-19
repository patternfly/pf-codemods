const {getFromPackage} = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/5275
module.exports = {
  meta: {fixable: "code"},
  create: function (context) {
    const { imports } = getFromPackage(context, "@patternfly/react-icons");

    const iconImport = imports.find((specifier) =>
      specifier.imported.name.includes("Icon")
    );

    return !iconImport
      ? {}
      : {
          JSXOpeningElement(node) {
            if (
              node.name.name === iconImport.local.name &&
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
