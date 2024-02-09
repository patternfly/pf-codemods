const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/${ruleName}');

ruleTester.run("${ruleName}", rule, {
  valid: [
    {
      code: `<componentName message />`
    }
  ],
  invalid: [
    {
      code:   `import { componentName } from '@patternfly/react-core'; <componentName message />`,
      output: `import { componentName } from '@patternfly/react-core'; <componentName message />`,
      errors: [{
        message: `message`,
        type: "JSXOpeningElement",
      }]
    },
  ]
});
