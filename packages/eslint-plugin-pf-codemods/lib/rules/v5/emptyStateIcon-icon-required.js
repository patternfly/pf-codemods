const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8737
module.exports = {
  meta: {},
  create: function (context) {
    const packageImport = getPackageImports(
      context,
      "@patternfly/react-core"
    ).find((specifier) => "EmptyStateIcon" === specifier.imported.name);

    return packageImport === undefined
      ? {}
      : {
          JSXOpeningElement(node) {
            if (
              packageImport.local.name === node.name.name &&
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
