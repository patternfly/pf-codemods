const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/charts-lightThemeObjects");

const oldLightThemeObjects = [
  "LightBlueColorTheme",
  "LightCyanColorTheme",
  "LightGoldColorTheme",
  "LightGrayColorTheme",
  "LightGreenColorTheme",
  "LightMultiColorOrderedTheme",
  "LightMultiColorUnorderedTheme",
  "LightOrangeColorTheme",
  "LightPurpleColorTheme",
];
ruleTester.run("charts-lightThemeObjects", rule, {
  // No @patternfly/react-charts import; using react-core as a stand-in
  valid: oldLightThemeObjects.map((themeObj) => {
    return {
      code: `import { ${themeObj} } from '@patternfly/react-core';`,
    };
  }),
  invalid: [
    ...oldLightThemeObjects.map((themeObj) => {
      return {
        code: `import { ${themeObj} } from '@patternfly/react-charts'`,
        output: `import { ${themeObj} } from '@patternfly/react-charts'`,
        errors: [
          {
            message: `The light theme objects from react-charts have been renamed to omit "Light" in the name. Rather than importing these objects directly, you must use the getTheme function from react-charts instead.`,
            type: "ImportDeclaration",
          },
        ],
      };
    }),
    // Import from dist
    ...oldLightThemeObjects.map((themeObj) => {
      return {
        code: `import { ${themeObj} } from '@patternfly/react-charts/dist/js/components/ChartTheme/themes/colors/multi-ordered-theme'`,
        output: `import { ${themeObj} } from '@patternfly/react-charts/dist/js/components/ChartTheme/themes/colors/multi-ordered-theme'`,
        errors: [
          {
            message: `The light theme objects from react-charts have been renamed to omit "Light" in the name. Rather than importing these objects directly, you must use the getTheme function from react-charts instead.`,
            type: "ImportDeclaration",
          },
        ],
      };
    }),
  ],
});
