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
      output: `import { VictoryZoomContainer } from 'victory-zoom-container';
import { Chart, ChartAxis, ChartGroup } from '@patternfly/react-charts';
<Chart containerComponent={<VictoryZoomContainer />}>
    <ChartAxis/>
        <ChartGroup  offset={11} horizontal>
            "some-chart"
        </ChartGroup>
</Chart>`,
      errors: [{
        messageId: "missingImportMsg",
        data: {
          missingImports: 'VictoryZoomContainer',
          ensurePackage: 'victory-zoom-container'
        }},
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
