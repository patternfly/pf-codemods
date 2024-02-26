const ruleTester = require("../../ruletester");
import * as rule from "./menuItemAction-warn-update-markup";

ruleTester.run("menuItemAction-warn-update-markup", rule, {
  valid: [
    {
      code: `import { MenuItemAction } from '@someOtherPackage';`,
    },
  ],
  invalid: [
    {
      code: `import { MenuItemAction } from '@patternfly/react-core';`,
      output: `import { MenuItemAction } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The markup for MenuItemAction has been updated. It now uses our Button component internally, has a wrapper around the action button, and no longer renders an icon wrapper inside the action button.`,
          type: "ImportDeclaration",
        },
      ],
    },
  ],
});
