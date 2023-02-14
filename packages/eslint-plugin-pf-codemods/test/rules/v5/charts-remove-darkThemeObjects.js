const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/charts-remove-darkThemeObjects");

const removedThemeObjects = [
  "DarkBlueColorTheme",
  "DarkCyanColorTheme",
  "DarkGoldColorTheme",
  "DarkGrayColorTheme",
  "DarkGreenColorTheme",
  "DarkMultiColorOrderedTheme",
  "DarkMultiColorUnorderedTheme",
  "DarkOrangeColorTheme",
  "DarkPurpleColorTheme",
];
ruleTester.run("charts-remove-darkThemeObjects", rule, {
  // No @patternfly/react-charts import; using react-core as a stand-in
  valid: removedThemeObjects.map((themeObj) => {
    return {
      code: `import { ${themeObj} } from '@patternfly/react-core';`,
    };
  }),
  invalid: [
    ...removedThemeObjects.map((themeObj) => {
      return {
        code: `import { ${themeObj}, ChartLegend } from '@patternfly/react-charts'`,
        output: `import {  ChartLegend } from '@patternfly/react-charts'`,
        errors: [
          {
            message: `All dark theme objects have been removed from react-charts.`,
            type: "ImportDeclaration",
          },
        ],
      };
    }),
    // Take into account importing from a deeper nested directory within react-charts
    ...removedThemeObjects.map((themeObj) => {
      return {
        code: `import { ${themeObj}, ChartLegend } from '@patternfly/react-charts/another/path'`,
        output: `import {  ChartLegend } from '@patternfly/react-charts/another/path'`,
        errors: [
          {
            message: `All dark theme objects have been removed from react-charts.`,
            type: "ImportDeclaration",
          },
        ],
      };
    }),
  ],
});
