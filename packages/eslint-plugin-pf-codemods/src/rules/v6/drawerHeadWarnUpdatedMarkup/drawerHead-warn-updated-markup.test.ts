const ruleTester = require("../../ruletester");
import * as rule from "./drawerHead-warn-updated-markup";

ruleTester.run("drawerHead-warn-updated-markup", rule, {
  valid: [
    {
      code: `<DrawerHead />`,
    },
  ],
  invalid: [
    {
      code: `import { DrawerHead } from '@patternfly/react-core'; <DrawerHead />`,
      output: `import { DrawerHead } from '@patternfly/react-core'; <DrawerHead />`,
      errors: [
        {
          message: `DrawerPanelBody is no longer rendered internally to DrawerHead. We recommend using these components independent of one another and to not pass DrawerPanelBody to DrawerHead.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
