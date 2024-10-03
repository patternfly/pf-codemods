const ruleTester = require("../../ruletester");
import * as rule from "./chartsImport-moved";
import {
  ValidTests,
  InvalidTests,
  createValidTest,
  createInvalidTest,
} from "../../helpers/testHelpers";

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

const validTests: ValidTests = [];
const invalidTests: InvalidTests = [];

specifiersToMove.forEach((specifier) => {
  validTests.push(createValidTest(`<${specifier} />`));
  validTests.push(
    createValidTest(
      `import { ${specifier} } from '@patternfly/react-charts/victory';`
    )
  );

  const errorMessage = `${specifier} has been moved. This rule will update import paths.`;
  invalidTests.push(
    createInvalidTest(
      `import { ${specifier} } from '@patternfly/react-charts';`,
      `import {\n\t${specifier}\n} from '@patternfly/react-charts/victory';`,
      [{ message: errorMessage, type: "ImportDeclaration" }]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${specifier} as CustomSpecifier } from '@patternfly/react-charts';`,
      `import {\n\t${specifier} as CustomSpecifier\n} from '@patternfly/react-charts/victory';`,
      [{ message: errorMessage, type: "ImportDeclaration" }]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${specifier} } from '@patternfly/react-charts/dist/esm/components/index.js';`,
      `import {\n\t${specifier}\n} from '@patternfly/react-charts/dist/esm/victory/components/index.js';`,
      [{ message: errorMessage, type: "ImportDeclaration" }]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${specifier} } from '@patternfly/react-charts/dist/js/components/index.js';`,
      `import {\n\t${specifier}\n} from '@patternfly/react-charts/dist/js/victory/components/index.js';`,
      [{ message: errorMessage, type: "ImportDeclaration" }]
    )
  );
});

ruleTester.run("chartImport-moved", rule, {
  valid: validTests,
  invalid: invalidTests,
});
