const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/charts-remove-themeVariant");

ruleTester.run("charts-remove-themeVariant", rule, {
  valid: [
    {
      code: `import { getCustomTheme } from '@patternfly/react-charts'; const newTheme = getCustomTheme(ChartThemeColor.default, customTheme);`,
    },
    // No @patternfly/react-charts import
    {
      code: `const newTheme = getCustomTheme(ChartThemeColor.default, themeVariant, customTheme);`,
    },
    {
      code: `import { Chart } from '@patternfly/react-charts'; <Chart />`,
    },
    // No @patternfly/react-charts import
    {
      code: `<Chart themeVariant />`,
    },
  ],
  invalid: [
    {
      code: `import { getCustomTheme } from '@patternfly/react-charts'; const newTheme = getCustomTheme(ChartThemeColor.default, variant, customTheme);`,
      output: `import { getCustomTheme } from '@patternfly/react-charts'; const newTheme = getCustomTheme(ChartThemeColor.default, customTheme);`,
      errors: [
        {
          message: `The themeVariant argument has been removed from the react-charts' getCustomTheme function.`,
          type: "CallExpression",
        },
      ],
    },
    {
      code: `import { Chart } from '@patternfly/react-charts'; <Chart themeVariant />`,
      output: `import { Chart } from '@patternfly/react-charts'; <Chart />`,
      errors: [
        {
          message: `The themeVariant prop has been removed for all react-charts components.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    // Import from dist
    {
      code: `import { Chart } from '@patternfly/react-charts/dist/esm/components/index.js'; <Chart themeVariant />`,
      output: `import { Chart } from '@patternfly/react-charts/dist/esm/components/index.js'; <Chart />`,
      errors: [
        {
          message: `The themeVariant prop has been removed for all react-charts components.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
