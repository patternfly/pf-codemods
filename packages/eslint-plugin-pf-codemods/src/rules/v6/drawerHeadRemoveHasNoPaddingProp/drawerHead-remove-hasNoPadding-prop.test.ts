const ruleTester = require("../../ruletester");
import * as rule from "./drawerHead-remove-hasNoPadding-prop";

ruleTester.run("drawerHead-remove-hasNoPadding-prop", rule, {
  valid: [
    {
      code: `<DrawerHead hasNoPadding />`,
    },
    {
      code: `import { DrawerHead } from '@patternfly/react-core'; <DrawerHead someOtherProp />`,
    },
  ],
  invalid: [
    {
      code: `import { DrawerHead } from '@patternfly/react-core'; <DrawerHead hasNoPadding />`,
      output: `import { DrawerHead } from '@patternfly/react-core'; <DrawerHead  />`,
      errors: [
        {
          message: `The \`hasNoPadding\` prop has been removed from DrawerHead.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
