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
              node.specifiers.filter((specifier) =>
                chartThemeVariantImport
                  .map((imp) => imp.local.name)
                  .includes(specifier.imported.name)
              ).length
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
                  const nextToken = context
                    .getSourceCode()
                    .getTokenAfter(chartThemeVariantImport[0]);
                  const rangeEnd =
                    nextToken && nextToken.value === ","
                      ? range[1] + 1
                      : range[1];
                  return fixer.replaceTextRange([range[0], rangeEnd], "");
                },
              });
          },
        };
  },
};
