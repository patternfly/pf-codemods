const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/popper-remove-popperMatchesTriggerWidth');

ruleTester.run("popper-remove-popperMatchesTriggerWidth", rule, {
  valid: [
    {
      code: `import { Popper } from '@patternfly/react-core'; <Popper />`,
    },
    {
      code: `import { Popper } from '@patternfly/react-core/dist/esm/components/Popover/index.js'; <Popper />`,
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
        message: `popperMatchesTriggerWidth prop has been removed for Popper. The width can instead be modified via the new minWidth, maxWidth, and width properties`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { Popper } from '@patternfly/react-core/dist/esm/components/Popover/index.js'; <Popper popperMatchesTriggerWidth />`,
      output: `import { Popper } from '@patternfly/react-core/dist/esm/components/Popover/index.js'; <Popper  />`,
      errors: [{
        message: `popperMatchesTriggerWidth prop has been removed for Popper.  The width can instead be modified via the new minWidth, maxWidth, and width properties`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
