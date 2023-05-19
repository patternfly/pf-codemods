const { getFromPackage } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8737
module.exports = {
  meta: {},
  create: function (context) {
    const emptyStateIconImport = getFromPackage(
      context,
      "@patternfly/react-core"
    ).imports.find((specifier) => "EmptyStateIcon" === specifier.imported.name);

    return emptyStateIconImport === undefined
      ? {}
      : {
          JSXOpeningElement(node) {
            if (
              emptyStateIconImport.local.name === node.name.name &&
              !node.attributes.some((attr) =>
                ["icon", "component"].includes(attr.name?.name)
              )
            ) {
              context.report({
                message: "icon prop is now required on the EmptyStateIcon.",
                node,
              });
            }
          },
        };
  },
};
