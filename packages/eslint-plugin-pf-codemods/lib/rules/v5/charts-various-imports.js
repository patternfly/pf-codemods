const { getFromPackage } = require("../../helpers");

const importReplacements = {
  ChartAreaSortOrder: "Victory's SortOrderPropType",
  ChartDonutLabelPosition: "Victory's VictorySliceLabelPositionType",
  ChartDonutSortOrder: "Victory's SortOrderPropType",
  ChartDonutThresholdSortOrder: "Victory's SortOrderPropType",
  ChartDonutUtilizationLabelPosition: "Victory's VictorySliceLabelPositionType",
  ChartDonutUtilizationSortOrder: "Victory's SortOrderPropType",
  ChartGroupSortOrder: "Victory's SortOrderPropType",
  ChartLabelPlacement: "Victory's LabelOrientationType",
  ChartLegendOrientation: "Victory's VictoryLegendOrientationType",
  ChartLegendRowGutter: "Victory's BlockProps",
  ChartLineSortOrder: "Victory's SortOrderPropType",
  ChartPieLabelPosition: "Victory's VictorySliceLabelPositionType",
  ChartPieSortOrder: "Victory's SortOrderPropType",
  ChartScatterSortOrder: "Victory's SortOrderPropType",
  ChartDonutThresholdDonutOrientation: "",
  ChartDonutThresholdLabelOrientation: "",
  ChartDonutThresholdLabelPosition: "",
  ChartLegendPosition: "",
  ChartDonutSubTitlePosition: "ChartDonutProps.subTitlePosition",
  ChartDonutThresholdSubTitlePosition:
    "ChartDonutThresholdProps.subTitlePosition",
  ChartDonutUtilizationLegendOrientation:
    "ChartDonutUtilizationProps.legendOrientation",
  ChartDonutUtilizationLegendPosition:
    "ChartDonutUtilizationProps.legendPosition",
  ChartDonutUtilizationSubTitlePosition:
    "ChartDonutUtilizationProps.subTitlePosition",
  ChartLabelDirection: "ChartLabelProps.direction",
  ChartPieLegendPosition: "ChartPieProps.legendPosition",
  ChartVoronoiDimension: "ChartVoronoiContainerProps.voronoiDimension",
};

// https://github.com/patternfly/patternfly-react/pull/8533
module.exports = {
  meta: {},
  create: function (context) {
    const importKeys = Object.keys(importReplacements);
    const chartImports = getFromPackage(
      context,
      "@patternfly/react-charts"
    ).imports.filter((specifier) =>
      importKeys.includes(specifier.imported.name)
    );

    return !chartImports.length
      ? {}
      : {
          ImportDeclaration(node) {
            if (!/^@patternfly\/react-charts/.test(node.source.value)) {
              return;
            }

            const affectedImports = node.specifiers.filter((specifier) =>
              chartImports
                .map((imp) => imp.imported.name)
                .includes(specifier.imported?.name)
            );

            affectedImports.forEach((imp) => {
              const importName = imp.imported?.name;
              const replacement = importReplacements[importName];

              context.report({
                node,
                message: `${importName} is no longer exported from react-charts${
                  replacement
                    ? ` and should be replaced with ${replacement}.`
                    : "."
                }`,
              });
            });
          },
        };
  },
};
