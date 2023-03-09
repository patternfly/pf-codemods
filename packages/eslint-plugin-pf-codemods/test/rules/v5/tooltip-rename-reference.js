const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/tooltip-rename-reference');

ruleTester.run("tooltip-rename-reference", rule, {
  valid: [
    {
      code: `import { Tooltip } from '@patternfly/react-core'; <Tooltip triggerRef />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Tooltip reference />`,
    }
  ],
  invalid: [
    {
      code:   `import { Tooltip } from '@patternfly/react-core'; <Tooltip reference />`,
      output: `import { Tooltip } from '@patternfly/react-core'; <Tooltip triggerRef />`,
      errors: [{
        message: `reference prop has been removed for Tooltip and replaced with the triggerRef prop.`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
