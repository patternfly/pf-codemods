const ruleTester = require("../../ruletester");
import * as rule from "./menuToggle-warn-iconOnly-toggle";

ruleTester.run("menuToggle-warn-iconOnly-toggle", rule, {
  valid: [
    {
      code: `<MenuToggle />`,
    },
  ],
  invalid: [
    {
      code: `import { MenuToggle } from '@patternfly/react-core'; <MenuToggle />`,
      output: `import { MenuToggle } from '@patternfly/react-core'; <MenuToggle />`,
      errors: [
        {
          message: `We now recommend passing any icon to the \`icon\` prop instead of passing it as children, such as for plain, icon only toggles. Passing an icon as children will result in incorrect styling.`,
          type: "ImportDeclaration",
        },
      ],
    },
  ],
});
