const { getFromPackage } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8617
module.exports = {
  create: function (context) {
    const menuItemActionImport = getFromPackage(
      context,
      "@patternfly/react-core"
    ).imports.filter((specifier) => specifier.imported.name == "MenuItemAction");

    return menuItemActionImport.length === 0
      ? {}
      : {
          JSXOpeningElement(node) {
            if (
              menuItemActionImport
                .map((imp) => imp.local.name)
                .includes(node.name.name)
            ) {
              const existingAriaLabel = node.attributes.find(
                (attr) => attr.name?.name === "aria-label"
              );

              if (!existingAriaLabel) {
                context.report({
                  node,
                  message: `The aria-label prop for ${node.name.name} is now required.`,
                });
              }
            }
          },
        };
  },
};
