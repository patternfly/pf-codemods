const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/menuItemAction-ariaLabel-required");

ruleTester.run("menuItemAction-ariaLabel-required", rule, {
  valid: [
    {
      code: `import { MenuItemAction } from '@patternfly/react-core'; <MenuItemAction aria-label="Test" />`,
    },
    {
      // No @patternfly/react-core import
      code: `<MenuItemAction />`,
    },
  ],
  invalid: [
    {
      code: `import { MenuItemAction } from '@patternfly/react-core'; <MenuItemAction />`,
      errors: [
        {
          message: `The aria-label prop for MenuItemAction is now required.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
