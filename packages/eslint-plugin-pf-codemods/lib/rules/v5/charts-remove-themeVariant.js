const { getFromPackage } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8590
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const {imports: chartsImports} = getFromPackage(
      context,
      "@patternfly/react-charts"
    );

    const codemodFunctions = {
      JSXOpeningElement(node) {
        if (
          chartsImports.map((imp) => imp.local.name).includes(node.name.name)
        ) {
          const themeVariantProp = node.attributes.find(
            (attribute) => attribute.name?.name === "themeVariant"
          );

          if (themeVariantProp) {
            context.report({
              node,
              message:
                "The themeVariant prop has been removed for all react-charts components.",
              fix(fixer) {
                const prevToken = context
                  .getSourceCode()
                  .getTokenBefore(themeVariantProp);
                return fixer.replaceTextRange(
                  [prevToken.range[1], themeVariantProp.range[1]],
                  ""
                );
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
              const prevToken = context
                .getSourceCode()
                .getTokenBefore(node.arguments[1]);

              return fixer.replaceTextRange([prevToken.range[0], range[1]], "");
            },
          });
        }
      };
    }

    return codemodFunctions;
  },
};
