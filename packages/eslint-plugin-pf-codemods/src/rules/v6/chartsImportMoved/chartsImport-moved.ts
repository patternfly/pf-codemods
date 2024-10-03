import { moveSpecifiers } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/11091

const specifiersToMove = [
'Chart',
'ChartArea',
'ChartAxis',
'ChartBar',
'ChartBoxPlot',
'ChartBullet',
'ChartBulletComparativeErrorMeasure',
'ChartBulletComparativeMeasure',
'ChartBulletComparativeWarningMeasure',
'ChartBulletPrimaryDotMeasure',
'ChartBulletPrimarySegmentedMeasure',
'ChartBulletQualitativeRange',
'ChartContainer',
'ChartCursorContainer',
'ChartCursorTooltip',
'ChartCursorFlyout',
'ChartDonut',
'ChartDonutThreshold',
'ChartDonutUtilization',
'ChartGroup',
'ChartLabel',
'ChartLegend',
'ChartLegendTooltip',
'ChartLegendTooltipContent',
'ChartLegendTooltipLabel',
'ChartLine',
'ChartPie',
'ChartPoint',
'ChartScatter',
'ChartStack',
'ChartTheme',
'ChartThemeColor',
'ChartThreshold',
'ChartTooltip',
'ChartVoronoiContainer',
'createContainer',
'getInteractiveLegendEvents',
'getInteractiveLegendItemStyles',
'getCustomTheme',
'getTheme',
'getThemeColors'
];

const fromPackage = "@patternfly/react-charts";
const toPackage = "@patternfly/react-charts/victory";
const messageAfterImportNameChange =
  "been moved. This rule will update import paths.";

module.exports = {
  meta: { fixable: "code" },
  create: moveSpecifiers(
    specifiersToMove,
    fromPackage,
    toPackage,
    messageAfterImportNameChange
  ),
};
