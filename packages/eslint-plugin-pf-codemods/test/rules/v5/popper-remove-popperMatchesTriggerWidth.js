const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/popper-remove-popperMatchesTriggerWidth');

ruleTester.run("popper-remove-popperMatchesTriggerWidth", rule, {
  valid: [
    {
      code: `import { Popper } from '@patternfly/react-core'; <Popper />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Popper popperMatchesTriggerWidth />`,
    }
  ],
  invalid: [
    {
      code:   `import { Popper } from '@patternfly/react-core'; <Popper popperMatchesTriggerWidth />`,
      output: `import { Popper } from '@patternfly/react-core'; <Popper  />`,
      errors: [{
        message: `popperMatchesTriggerWidth prop has been removed for Popper, minWidth now covers this by default. Minimum and maximum width can be modified via the new minWidth and maxWidth properties`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
