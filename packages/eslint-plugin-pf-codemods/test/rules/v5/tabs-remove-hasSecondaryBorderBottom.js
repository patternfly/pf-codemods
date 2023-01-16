const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/tabs-remove-hasSecondaryBorderBottom");

ruleTester.run("tabs-remove-hasSecondaryBorderBottom", rule, {
  valid: [
    {
      code: `import { Tabs } from '@patternfly/react-core'; <Tabs />`,
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
          message: `hasSecondaryBorderBottom prop has been removed for Tabs.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
