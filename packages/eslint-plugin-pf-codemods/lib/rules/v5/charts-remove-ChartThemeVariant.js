const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8590
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const chartThemeVariantImport = getPackageImports(
      context,
      "@patternfly/react-charts"
    ).filter((specifier) => specifier.imported.name == "ChartThemeVariant");

    return !chartThemeVariantImport.length
      ? {}
      : {
          ImportDeclaration(node) {
            if (
              node.specifiers.find(
                (specifier) =>
                  specifier.imported.name ===
                  chartThemeVariantImport[0].local.name
              )
            )
              context.report({
                node,
                message:
                  "ChartThemeVariant has been removed from react-charts.",
                fix(fixer) {
                  if (node.specifiers.length === 1) {
                    return fixer.remove(node);
                  }

                  const { range } = chartThemeVariantImport[0];
                  const prevToken = context
                    .getSourceCode()
                    .getTokenBefore(chartThemeVariantImport[0]);
                  const nextToken = context
                    .getSourceCode()
                    .getTokenAfter(chartThemeVariantImport[0]);

                  const rangeStart =
                    prevToken.value === ","
                      ? prevToken.range[0]
                      : prevToken.range[1];
                  const rangeEnd =
                    prevToken.value === "{" && nextToken.value === ","
                      ? nextToken.range[1]
                      : range[1];
                  return fixer.replaceTextRange([rangeStart, rangeEnd], "");
                },
              });
          },
        };
  },
};
