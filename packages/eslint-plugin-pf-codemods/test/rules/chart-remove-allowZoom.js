const ruleTester = require('../ruletester');
const rule = require('../../lib/rules/chart-remove-allowZoom');

ruleTester.run("createContainer-insteadof-allowZoom", rule, {
  valid: [
    {
      code: `import { VictoryZoomContainer } from 'victory-zoom-container';
import { Chart } from '@patternfly/react-charts';
import { ChartAxis } from '@patternfly/react-charts';
import { ChartGroup } from '@patternfly/react-charts';
<Chart containerComponent={<VictoryZoomContainer />}>
    <ChartAxis />
        <ChartGroup offset={11} horizontal>
            "some-chart"
        </ChartGroup>
</Chart>`,
    }
  ],
  invalid: [
    {
      code: `import { Chart, ChartAxis, ChartGroup } from '@patternfly/react-charts';
<Chart allowZoom>
    <ChartAxis/>
        <ChartGroup allowZoom offset={11} horizontal>
            "some-chart"
        </ChartGroup>
</Chart>`,
      output: `import { Chart, ChartAxis, ChartGroup } from '@patternfly/react-charts';
import { VictoryZoomContainer } from 'victory-zoom-container';
<Chart containerComponent={<VictoryZoomContainer />}>
    <ChartAxis/>
        <ChartGroup  offset={11} horizontal>
            "some-chart"
        </ChartGroup>
</Chart>`,
      errors: [{
          message: `add missing import { VictoryZoomContainer } from 'victory-zoom-container';`,
          type: "ImportDeclaration",
        },
        {
          message: `allowZoom prop for Chart has been renamed to containerComponent={<VictoryZoomContainer />}`,
          type: "JSXOpeningElement",
        },
        {
          message: `allowZoom prop for ChartGroup has been removed`,
          type: "JSXOpeningElement",
        }]
    },
  ]
});
