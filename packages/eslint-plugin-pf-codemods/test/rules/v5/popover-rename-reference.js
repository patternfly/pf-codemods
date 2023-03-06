const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/popover-rename-reference');

ruleTester.run("popover-rename-reference", rule, {
  valid: [
    {
      code: `import { Popover } from '@patternfly/react-core'; <Popover triggerRef />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Popover reference />`,
    }
  ],
  invalid: [
    {
      code:   `import { Popover } from '@patternfly/react-core'; <Popover reference />`,
      output: `import { Popover } from '@patternfly/react-core'; <Popover triggerRef />`,
      errors: [{
        message: `reference prop has been removed for Popover and replaced with the triggerRef prop.`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
