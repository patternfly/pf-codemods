const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/charts-various-imports");
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
const importKeys = Object.keys(importReplacements);
const getErrorMessage = (importName) =>
  `${importName} is no longer exported from react-charts${
    importReplacements[importName]
      ? ` and should be replaced with ${importReplacements[importName]}.`
      : "."
  }`;

ruleTester.run("charts-various-imports", rule, {
  valid: [
    {
      code: `import { ChartThemeColor } from '@patternfly/react-charts';`,
    },
    // No @patternfly/react-charts import
    ...importKeys.map((imp) => ({
      code: `import { ${imp} } from 'foo';`,
    })),
  ],
  invalid: [
    ...importKeys
      .map((imp) => {
        const tests = [];
        const errors = [
          {
            message: getErrorMessage(imp),
            type: "ImportDeclaration",
          },
        ];

        tests.push({
          code: `import { ${imp} } from '@patternfly/react-charts';`,
          errors,
        });
        // Import from dist
        tests.push({
          code: `import { ${imp} } from '@patternfly/react-charts/dist/js/components/some/other/path';`,
          errors,
        });
        // Aliased import
        tests.push({
          code: `import { ${imp} as CustomName } from '@patternfly/react-charts';`,
          errors,
        });

        return tests;
      })
      .flat(),
  ],
});
