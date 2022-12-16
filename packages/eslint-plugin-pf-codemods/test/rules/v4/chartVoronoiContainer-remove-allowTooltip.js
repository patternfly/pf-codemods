const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v4/chartVoronoiContainer-remove-allowTooltip');

ruleTester.run("chartVoronoiContainer-remove-allowTooltip", rule, {
  valid: [
    {
      code: `import { ChartVoronoiContainer } from '@patternfly/react-charts'; <ChartVoronoiContainer/>`,
    }
  ],
  invalid: [
    {
      code: `import { ChartVoronoiContainer } from '@patternfly/react-charts'; <ChartVoronoiContainer allowTooltip={!allHidden} />`,
      output: `import { ChartVoronoiContainer } from '@patternfly/react-charts'; <ChartVoronoiContainer  />`,
      errors: [{
        message: `allowTooltip prop for ChartVoronoiContainer has been removed`,
        type: "JSXOpeningElement",
      }]
    },
  ]
});
