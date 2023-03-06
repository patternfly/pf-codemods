const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/drawer-warn-updated-callback");

ruleTester.run("drawer-warn-updated-callback", rule, {
  valid: [
    {
      code: `import { Drawer } from '@patternfly/react-core'; <Drawer />;`,
    },
    {
      // No @patternfly/react-core import
      code: `<Drawer onResize />;`,
    },
  ],
  invalid: [
    {
      code: `import { Drawer } from '@patternfly/react-core'; <Drawer onResize />;`,
      output: `import { Drawer } from '@patternfly/react-core'; <Drawer onResize />;`,
      errors: [
        {
          message: `The "onResize" prop for Drawer has been updated to include the event parameter as its first parameter. "onResize" handlers may require an update.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Drawer as PFdrawer } from '@patternfly/react-core'; <PFdrawer onResize />;`,
      output: `import { Drawer as PFdrawer } from '@patternfly/react-core'; <PFdrawer onResize />;`,
      errors: [
        {
          message: `The "onResize" prop for Drawer has been updated to include the event parameter as its first parameter. "onResize" handlers may require an update.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
