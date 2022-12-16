const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/divider-remove-isVertical');

ruleTester.run("divider-remove-isVertical", rule, {
  valid: [
    {
      code: `import { Divider } from '@patternfly/react-core'; <Divider />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Divider />`,
    }
  ],
  invalid: [
    {
      code:   `import { Divider } from '@patternfly/react-core'; <Divider isVertical />`,
      output: `import { Divider } from '@patternfly/react-core'; <Divider orientation={{ default: 'vertical' }} />`,
      errors: [{
        message: `isVertical prop has been removed for Divider and replaced with the orientation prop, which can specify verticality at various breakpoints.`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
