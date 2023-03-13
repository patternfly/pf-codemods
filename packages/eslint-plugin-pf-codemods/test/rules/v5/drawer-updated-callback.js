const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/drawer-updated-callback");

ruleTester.run("drawer-updated-callback", rule, {
  valid: [
    {
      code: `import { DrawerPanelContent } from '@patternfly/react-core'; <DrawerPanelContent />;`,
    },
    {
      code: `import { DrawerPanelContent } from '@patternfly/react-core'; <DrawerPanelContent onResize={() => onResize()} />;`,
    },
    {
      // No @patternfly/react-core import
      code: `<DrawerPanelContent onResize />;`,
    },
  ],
  invalid: [
    {
      code: `import { DrawerPanelContent } from '@patternfly/react-core'; <DrawerPanelContent onResize={(width, id) => onResize()} />;`,
      output: `import { DrawerPanelContent } from '@patternfly/react-core'; <DrawerPanelContent onResize={(width, id) => onResize()} />;`,
      errors: [
        {
          message: `The "onResize" prop for DrawerPanelContent has been updated so that the "event" parameter is the first parameter. "onResize" handlers may require an update.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { DrawerPanelContent as PFdrawer } from '@patternfly/react-core'; <PFdrawer onResize={(width, id) => onResize()} />;`,
      output: `import { DrawerPanelContent as PFdrawer } from '@patternfly/react-core'; <PFdrawer onResize={(width, id) => onResize()} />;`,
      errors: [
        {
          message: `The "onResize" prop for PFdrawer has been updated so that the "event" parameter is the first parameter. "onResize" handlers may require an update.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
