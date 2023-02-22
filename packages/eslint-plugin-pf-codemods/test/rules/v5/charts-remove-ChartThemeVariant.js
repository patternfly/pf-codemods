const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/charts-remove-ChartThemeVariant");

ruleTester.run("charts-remove-ChartThemeVariant", rule, {
  valid: [
    {
      code: `import { ChartThemeVariant } from '@patternfly/react-core';`,
    },
    {
      code: `import { Chart } from '@patternfly/react-charts';`,
    },
  ],
  invalid: [
    {
      code: `import { Chart, ChartThemeVariant } from '@patternfly/react-charts';`,
      output: `import { Chart } from '@patternfly/react-charts';`,
      errors: [
        {
          message: `ChartThemeVariant has been removed from react-charts.`,
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `import { ChartThemeVariant, Chart } from '@patternfly/react-charts';`,
      output: `import { Chart } from '@patternfly/react-charts';`,
      errors: [
        {
          message: `ChartThemeVariant has been removed from react-charts.`,
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `import { Chart, ChartThemeVariant, ChartLegend } from '@patternfly/react-charts';`,
      output: `import { Chart, ChartLegend } from '@patternfly/react-charts';`,
      errors: [
        {
          message: `ChartThemeVariant has been removed from react-charts.`,
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `import { ChartThemeVariant } from '@patternfly/react-charts';`,
      output: ``,
      errors: [
        {
          message: `ChartThemeVariant has been removed from react-charts.`,
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `import { ChartThemeVariant as CTV } from '@patternfly/react-charts';`,
      output: ``,
      errors: [
        {
          message: `ChartThemeVariant has been removed from react-charts.`,
          type: "ImportDeclaration",
        },
      ],
    },
  ],
});
