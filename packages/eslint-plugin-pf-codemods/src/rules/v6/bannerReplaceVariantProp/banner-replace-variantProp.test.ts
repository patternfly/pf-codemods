const ruleTester = require("../../ruletester");
import * as rule from "./banner-replace-variantProp";

const createErrorMessage = (hasValueOfDefault?: boolean) =>
  `The variant property has been removed from Banner. We recommend using our new color or status properties, depending on the original intent of the variant property. Running the fix for this rule will ${
    hasValueOfDefault
      ? "remove the variant property"
      : "replace the variant property with the color property"
  }, but additional manual updates may need to be made.`;

ruleTester.run("banner-replace-variantProp", rule, {
  valid: [
    {
      code: `<Banner variant />`,
    },
    {
      code: `import { Banner } from '@patternfly/react-core'; <Banner />`,
    },
  ],
  invalid: [
    {
      code: `import { Banner } from '@patternfly/react-core'; <Banner variant="default" />`,
      output: `import { Banner } from '@patternfly/react-core'; <Banner  />`,
      errors: [
        {
          message: createErrorMessage(true),
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Banner } from '@patternfly/react-core'; <Banner variant="red" />`,
      output: `import { Banner } from '@patternfly/react-core'; <Banner color="red" />`,
      errors: [
        {
          message: createErrorMessage(),
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Banner as CustomBanner } from '@patternfly/react-core'; <CustomBanner variant="default" />`,
      output: `import { Banner as CustomBanner } from '@patternfly/react-core'; <CustomBanner  />`,
      errors: [
        {
          message: createErrorMessage(true),
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Banner } from '@patternfly/react-core/dist/esm/components/Banner/index.js'; <Banner variant="default" />`,
      output: `import { Banner } from '@patternfly/react-core/dist/esm/components/Banner/index.js'; <Banner  />`,
      errors: [
        {
          message: createErrorMessage(true),
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Banner } from '@patternfly/react-core/dist/js/components/Banner/index.js'; <Banner variant="default" />`,
      output: `import { Banner } from '@patternfly/react-core/dist/js/components/Banner/index.js'; <Banner  />`,
      errors: [
        {
          message: createErrorMessage(true),
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Banner } from '@patternfly/react-core/dist/dynamic/components/Banner/index.js'; <Banner variant="default" />`,
      output: `import { Banner } from '@patternfly/react-core/dist/dynamic/components/Banner/index.js'; <Banner  />`,
      errors: [
        {
          message: createErrorMessage(true),
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
