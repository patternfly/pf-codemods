const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/horizontalSubnav-warn-ariaLabel");

ruleTester.run("horizontalSubnav-warn-ariaLabel", rule, {
  valid: [
    {
      code: `import { Nav } from '@patternfly/react-core'; <Nav variant="horizontal" />`,
    },
    {
      code: `import { Nav } from '@patternfly/react-core'; <Nav variant="horizontal-subnav" aria-label="Test text" />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Nav variant="horizontal-subnav" />`,
    },
  ],
  invalid: [
    {
      code: `import { Nav } from '@patternfly/react-core'; <Nav variant="horizontal-subnav" />`,
      errors: [
        {
          message: `The default value of the aria-label for Nav with a 'horizontal-subnav' variant has been updated to "local".`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
