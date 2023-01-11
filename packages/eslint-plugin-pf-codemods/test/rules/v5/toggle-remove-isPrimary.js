const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/toggle-remove-isPrimary');

ruleTester.run("toggle-remove-isPrimary", rule, {
  valid: [
    {
      code: `import { Toggle } from '@patternfly/react-core'; <Toggle toggleVariant />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Toggle isPrimary />`,
    }
  ],
  invalid: [
    {
      code:   `import { Toggle } from '@patternfly/react-core'; <Toggle isPrimary />`,
      output: `import { Toggle } from '@patternfly/react-core'; <Toggle toggleVariant="primary" />`,
      errors: [{
        message: `isPrimary prop has been removed for Toggle and replaced by using 'primary' value on the toggleVariant prop.`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
