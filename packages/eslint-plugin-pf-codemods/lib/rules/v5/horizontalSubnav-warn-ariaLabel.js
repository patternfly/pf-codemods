const { getFromPackage } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8213
module.exports = {
  create: function (context) {
    const navImport = getFromPackage(
      context,
      "@patternfly/react-core"
    ).imports.filter((specifier) => specifier.imported.name == "Nav");

    return navImport.length === 0
      ? {}
      : {
          JSXOpeningElement(node) {
            if (
              navImport.map((imp) => imp.local.name).includes(node.name.name)
            ) {
              const variantAttr = node.attributes.find(
                (attr) => attr.name?.name === "variant"
              );
              const existingAriaLabel = node.attributes.find(
                (attr) => attr.name?.name === "aria-label"
              );

              if (
                variantAttr?.value?.value === "horizontal-subnav" &&
                !existingAriaLabel
              ) {
                context.report({
                  node,
                  message: `The default value of the aria-label for ${node.name.name} with a 'horizontal-subnav' variant has been updated to "local".`,
                });
              }
            }
          },
        };
  },
};
