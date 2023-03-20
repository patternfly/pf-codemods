const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/banner-update-variant");
const variantMap = [
  { info: "blue" },
  { danger: "red" },
  { warning: "gold" },
  { success: "green" },
];

ruleTester.run("banner-update-variant", rule, {
  valid: [
    {
      code: `import { Banner } from '@patternfly/react-core'; <Banner />`,
    },
    {
      code: `import { Banner } from '@patternfly/react-core'; <Banner variant="default" />`,
    },
    {
      code: `import { Banner } from '@patternfly/react-core'; <Banner variant="blue" />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Banner variant="danger" />`,
    },
  ],
  invalid: [
    {
      code: `import { Banner } from '@patternfly/react-core'; const status = 'default'; <Banner variant={status} />`,
      output: `import { Banner } from '@patternfly/react-core'; const status = 'default'; <Banner variant={status} />`,
      errors: [
        {
          message: `The "variant" prop type for Banner has been updated. "default" is still a valid value, but the previous status values of "info", "success", "warning", and "danger" have been replaced with color values of "blue", "green", "gold", and "red", respectively.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    ...variantMap.map((variant) => {
      const key = Object.keys(variant);

      return {
        code: `import { Banner } from '@patternfly/react-core'; <Banner variant="${key}" />`,
        output: `import { Banner } from '@patternfly/react-core'; <Banner variant="${variant[key]}" />`,
        errors: [
          {
            message: `The "variant" prop type for Banner has been updated. "default" is still a valid value, but the previous status values of "info", "success", "warning", and "danger" have been replaced with color values of "blue", "green", "gold", and "red", respectively.`,
            type: "JSXOpeningElement",
          },
        ],
      };
    }),
  ],
});
