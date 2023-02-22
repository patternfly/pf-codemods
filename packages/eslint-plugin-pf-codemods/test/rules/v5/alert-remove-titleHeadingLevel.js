const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/alert-remove-titleHeadingLevel');

ruleTester.run("alert-remove-titleHeadingLevel", rule, {
  valid: [
    {
      code: `import { Alert } from '@patternfly/react-core'; <Alert component />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Alert titleHeadingLevel />`,
    }
  ],
  invalid: [
    {
      code:   `import { Alert } from '@patternfly/react-core'; <Alert titleHeadingLevel />`,
      output: `import { Alert } from '@patternfly/react-core'; <Alert component />`,
      errors: [{
        message: `titleHeadingLevel prop has been removed for Alert and replaced with the component prop.`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
