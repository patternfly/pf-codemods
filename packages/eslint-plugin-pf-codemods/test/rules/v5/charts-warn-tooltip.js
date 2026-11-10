const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/charts-warn-tooltip");

ruleTester.run("charts-warn-tooltip", rule, {
  valid: [
    {
      code: `import { Chart } from '@patternfly/react-charts';`,
    },
    {
      code: `import { Tooltip } from '@patternfly/react-core';`,
    },
  ],
  invalid: [
    {
      code: `import { Chart } from '@patternfly/react-charts'; import { Tooltip } from '@patternfly/react-core';`,
      output: null,
      errors: [
        {
          message: `The react-core Tooltip should be wrapped inside a foreignObject when used inside a react-charts component. The Tooltip may not render properly otherwise due to it outputting a div element inside an svg element.`,
        },
      ],
    },
    {
      code: `import { Chart } from '@patternfly/react-charts/dist/js/components/Chart/index.js'; import { Tooltip } from '@patternfly/react-core';`,
      output: null,
      errors: [
        {
          message: `The react-core Tooltip should be wrapped inside a foreignObject when used inside a react-charts component. The Tooltip may not render properly otherwise due to it outputting a div element inside an svg element.`,
        },
      ],
    },
    {
      code: `import { Chart as PFChart } from '@patternfly/react-charts'; import { Tooltip as PFTooltip } from '@patternfly/react-core';`,
      output: null,
      errors: [
        {
          message: `The react-core Tooltip should be wrapped inside a foreignObject when used inside a react-charts component. The Tooltip may not render properly otherwise due to it outputting a div element inside an svg element.`,
        },
      ],
    },
  ],
});
