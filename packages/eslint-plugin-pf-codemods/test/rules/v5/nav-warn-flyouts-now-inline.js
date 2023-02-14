const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/nav-warn-flyouts-now-inline");

ruleTester.run("nav-warn-flyouts-now-inline", rule, {
  valid: [
    {
      code: `import { Nav } from '@patternfly/react-core'; <Nav />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Nav flyout={menu} />`,
    },
  ],
  invalid: [
    {
      code: `import { Nav } from '@patternfly/react-core'; <Nav flyout={menu} />`,
      output: `import { Nav } from '@patternfly/react-core'; <Nav flyout={menu} />`,
      errors: [
        {
          message: "The placement Nav flyouts in the DOM has been changed, you may need to update some selectors or snapshots in your test suites.",
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
