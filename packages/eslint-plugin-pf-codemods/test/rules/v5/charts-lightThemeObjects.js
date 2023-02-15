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
    // Take into account importing from a deeper nested directory within react-charts
    ...oldLightThemeObjects.map((themeObj) => {
      return {
        code: `import { ${themeObj} } from '@patternfly/react-charts/another/path'`,
        output: `import { ${themeObj} } from '@patternfly/react-charts/another/path'`,
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
