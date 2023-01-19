const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/remove-toggleMenuBaseProps');

ruleTester.run("remove-toggleMenuBaseProps", rule, {
  valid: [
    {
      // No @patternfly/react-core import
      code: `<ToggleMenuBaseProps />`,
    }
  ],
  invalid: [
    {
      code:   `import { ToggleMenuBaseProps } from '@patternfly/react-core'; <ToggleMenuBaseProps />`,
      output: `import { ToggleMenuBaseProps } from '@patternfly/react-core'; <ToggleMenuBaseProps />`,
      errors: [{
        message: `The ToggleMenuBaseProps interface has been removed.`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
