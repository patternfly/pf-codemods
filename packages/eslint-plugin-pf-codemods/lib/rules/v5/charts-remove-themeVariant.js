const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8590
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const chartsImports = getPackageImports(
      context,
      "@patternfly/react-charts"
    );

    const codemodFunctions = {
      JSXOpeningElement(node) {
        console.log(node);
        if (
          chartsImports.map((imp) => imp.local.name).includes(node.name.name)
        ) {
          const themeVariantProp = node.attributes.find(
            (attribute) => attribute.name.name === "themeVariant"
          );

          if (themeVariantProp) {
            context.report({
              node,
              message:
                "The themeVariant prop has been removed for all react-charts components.",
              fix(fixer) {
                return fixer.replaceTextRange(themeVariantProp.range, "");
              },
            });
          }
        }
      },
    };

    const getCustomThemeImport = chartsImports.filter(
      (specifier) => specifier.imported.name == "getCustomTheme"
    );
    if (getCustomThemeImport.length) {
      codemodFunctions["CallExpression"] = function (node) {
        if (
          node.callee.name === "getCustomTheme" &&
          node.arguments.length === 3
        ) {
          context.report({
            node,
            message:
              "The themeVariant argument has been removed from the react-charts' getCustomTheme function.",
            fix(fixer) {
              const { range } = node.arguments[1];

              return fixer.replaceTextRange([range[0], range[1] + 1], "");
            },
          });
        }
      };
    }

    return codemodFunctions;
  },
};
