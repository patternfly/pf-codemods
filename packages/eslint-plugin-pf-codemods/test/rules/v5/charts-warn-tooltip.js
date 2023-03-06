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
      output: `import { Chart } from '@patternfly/react-charts'; import { Tooltip } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The react-core Tooltip should be wrapped inside a foreignObject when used inside a react-charts component. The Tooltip may not render properly otherwise due to it outputting a div element inside an svg element.`,
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `import { Chart as PFChart } from '@patternfly/react-charts'; import { Tooltip as PFTooltip } from '@patternfly/react-core';`,
      output: `import { Chart as PFChart } from '@patternfly/react-charts'; import { Tooltip as PFTooltip } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The react-core Tooltip should be wrapped inside a foreignObject when used inside a react-charts component. The Tooltip may not render properly otherwise due to it outputting a div element inside an svg element.`,
          type: "ImportDeclaration",
        },
      ],
    },
  ],
});
