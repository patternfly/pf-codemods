const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8737
module.exports = {
  meta: {},
  create: function (context) {
    const imports = getPackageImports(context, "@patternfly/react-core").filter(
      (specifier) => "EmptyStateIcon" === specifier.imported.name
    );
    return imports.length === 0
      ? {}
      : {
          JSXOpeningElement(node) {
            if (imports.find((imp) => imp.local.name === node.name.name)) {
              const iconPropIncluded = node.attributes
                .filter((attr) => attr.name)
                .map((attr) => attr.name.name)
                .includes("icon");

              if (!iconPropIncluded) {
                context.report({
                  message: "icon prop is now required on the EmptyStateIcon.",
                  node,
                });
              }
            }
          },
        };
  },
};
