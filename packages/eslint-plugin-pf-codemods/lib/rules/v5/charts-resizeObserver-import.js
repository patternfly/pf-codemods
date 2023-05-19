const { getFromPackage } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8533
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const chartResizeImport = getFromPackage(
      context,
      "@patternfly/react-charts"
    ).imports.filter((specifier) => specifier.imported.name == "getResizeObserver");

    return chartResizeImport.length === 0
      ? {}
      : {
          ImportDeclaration(node) {
            if (
              /^@patternfly\/react-charts/.test(node.source.value) &&
              node.specifiers.filter((specifier) =>
                chartResizeImport
                  .map((imp) => imp.imported.name)
                  .includes(specifier.imported?.name)
              ).length
            ) {
              context.report({
                node,
                message: `The getResizeObserver function has been removed from react-charts and should be imported from react-core instead.`,
                fix(fixer) {
                  const fixes = [];
                  if (node.specifiers.length > 1) {
                    const { range } = chartResizeImport[0];
                    const nextToken = context
                      .getSourceCode()
                      .getTokenAfter(chartResizeImport[0]);
                    const rangeEnd =
                      nextToken && nextToken.value === ","
                        ? range[1] + 1
                        : range[1];

                    fixes.push(
                      fixer.replaceTextRange([range[0], rangeEnd], "")
                    );
                    fixes.push(
                      fixer.insertTextAfterRange(
                        node.range,
                        "\nimport {getResizeObserver} from '@patternfly/react-core';"
                      )
                    );
                  } else {
                    fixes.push(
                      fixer.replaceText(node.source, "'@patternfly/react-core'")
                    );
                  }

                  return fixes;
                },
              });
            }
          },
        };
  },
};
