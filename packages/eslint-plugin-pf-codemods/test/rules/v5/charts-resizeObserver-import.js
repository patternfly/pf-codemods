const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/charts-resizeObserver-import");

ruleTester.run("charts-resizeObserver-import", rule, {
  valid: [
    {
      code: `import { getResizeObserver } from '@patternfly/react-core';`,
    },
    {
      code: `import { Chart } from '@patternfly/react-charts';`,
    },
  ],
  invalid: [
    {
      code: `import { getResizeObserver } from '@patternfly/react-charts';`,
      output: `import { getResizeObserver } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The getResizeObserver function has been removed from react-charts and should be imported from react-core instead.`,
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `import { getResizeObserver as getRO } from '@patternfly/react-charts';`,
      output: `import { getResizeObserver as getRO } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The getResizeObserver function has been removed from react-charts and should be imported from react-core instead.`,
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `import { getResizeObserver, Chart } from '@patternfly/react-charts';`,
      output: `import {  Chart } from '@patternfly/react-charts';\nimport {getResizeObserver} from '@patternfly/react-core';`,
      errors: [
        {
          message: `The getResizeObserver function has been removed from react-charts and should be imported from react-core instead.`,
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `import { Chart, getResizeObserver, ChartArea } from '@patternfly/react-charts';`,
      output: `import { Chart,  ChartArea } from '@patternfly/react-charts';\nimport {getResizeObserver} from '@patternfly/react-core';`,
      errors: [
        {
          message: `The getResizeObserver function has been removed from react-charts and should be imported from react-core instead.`,
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `import { getResizeObserver } from '@patternfly/react-charts/dist/js/components/ChartUtils/chart-resize';`,
      output: `import { getResizeObserver } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The getResizeObserver function has been removed from react-charts and should be imported from react-core instead.`,
          type: "ImportDeclaration",
        },
      ],
    },
  ],
});
