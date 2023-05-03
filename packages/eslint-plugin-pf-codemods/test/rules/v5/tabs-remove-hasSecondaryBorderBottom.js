const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/tabs-remove-hasSecondaryBorderBottom");

ruleTester.run("tabs-remove-hasSecondaryBorderBottom", rule, {
  valid: [
    {
      code: `import { Tabs } from '@patternfly/react-core'; <Tabs />`,
    },
    {
      code: `import { Tabs } from '@patternfly/react-core/dist/esm/components/Tabs/index.js'; <Tabs />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Tabs hasSecondaryBorderBottom />`,
    },
  ],
  invalid: [
    {
      code: `import { Tabs } from '@patternfly/react-core'; <Tabs hasSecondaryBorderBottom />`,
      output: `import { Tabs } from '@patternfly/react-core'; <Tabs  />`,
      errors: [
        {
          message: `hasSecondaryBorderBottom prop for Tabs has been removed`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Tabs } from '@patternfly/react-core/dist/esm/components/Tabs/index.js'; <Tabs hasSecondaryBorderBottom />`,
      output: `import { Tabs } from '@patternfly/react-core/dist/esm/components/Tabs/index.js'; <Tabs  />`,
      errors: [
        {
          message: `hasSecondaryBorderBottom prop for Tabs has been removed`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
