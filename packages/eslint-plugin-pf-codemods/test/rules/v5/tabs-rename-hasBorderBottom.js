const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/tabs-rename-hasBorderBottom");

ruleTester.run("tabs-rename-hasBorderBottom", rule, {
  valid: [
    {
      code: `import { Tabs } from '@patternfly/react-core'; <Tabs hasNoBorderBottom />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Tabs hasBorderBottom />`,
    },
  ],
  invalid: [
    {
      code: `import { Tabs } from '@patternfly/react-core'; <Tabs hasBorderBottom />`,
      output: `import { Tabs } from '@patternfly/react-core'; <Tabs  />`,
      errors: [
        {
          message: `hasBorderBottom prop has been removed for Tabs. Use hasNoBorderBottom instead`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Tabs } from '@patternfly/react-core'; <Tabs hasBorderBottom={true} />`,
      output: `import { Tabs } from '@patternfly/react-core'; <Tabs  />`,
      errors: [
        {
          message: `hasBorderBottom prop has been removed for Tabs. Use hasNoBorderBottom instead`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Tabs } from '@patternfly/react-core'; <Tabs hasBorderBottom={false} />`,
      output: `import { Tabs } from '@patternfly/react-core'; <Tabs hasNoBorderBottom />`,
      errors: [
        {
          message: `hasBorderBottom prop has been removed for Tabs. Use hasNoBorderBottom instead`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Tabs } from '@patternfly/react-core'; <Tabs hasBorderBottom={foo && bar} />`,
      output: `import { Tabs } from '@patternfly/react-core'; <Tabs hasNoBorderBottom={!(foo && bar)} />`,
      errors: [
        {
          message: `hasBorderBottom prop has been removed for Tabs. Use hasNoBorderBottom instead`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
