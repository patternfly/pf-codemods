const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8533
module.exports = {
  meta: {},
  create: function (context) {
    const chartImports = getPackageImports(context, "@patternfly/react-charts");
    const tooltipImport = getPackageImports(
      context,
      "@patternfly/react-core"
    ).filter((specifier) => specifier.imported.name == "Tooltip");

    return !chartImports.length || !tooltipImport.length
      ? {}
      : {
          ImportDeclaration(node) {
            if (
              /^@patternfly\/react-core/.test(node.source.value) &&
              node.specifiers.filter((specifier) =>
                tooltipImport
                  .map((imp) => imp.local.name)
                  .includes(specifier.imported?.name)
              ).length
            ) {
              context.report({
                node,
                message: `The react-core Tooltip should be wrapped inside a foreignObject when used inside a react-charts component. The Tooltip may not render properly otherwise due to it outputting a div element inside an svg element.`,
              });
            }
          },
        };
  },
};
