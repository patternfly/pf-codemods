const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8144
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const buttonImport = getPackageImports(
      context,
      "@patternfly/react-core"
    ).find((specifier) => specifier.imported.name === "Button");

    if (!buttonImport) {
      return {};
    }

    const propMap = {
      isSmall: 'size="sm"',
      isLarge: 'size="lg"',
    };

    return {
      JSXOpeningElement(node) {
        if (node.name.name !== buttonImport.local.name) {
          return;
        }

        node.attributes
          .filter((attribute) => propMap.hasOwnProperty(attribute.name.name))
          .forEach((attribute) => {
            const newProp = propMap[attribute.name.name];
            context.report({
              node,
              message: `use ${newProp} instead of ${attribute.name.name} prop for ${node.name.name}`,
              fix(fixer) {
                return fixer.replaceText(attribute, newProp);
              },
            });
          });
      },
    };
  },
};
