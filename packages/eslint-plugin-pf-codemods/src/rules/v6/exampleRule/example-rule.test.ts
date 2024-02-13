const ruleTester = require('../../ruletester');
const rule = require('./example-rule');

ruleTester.run("example-rule", rule, {
  valid: [
    {
      code: `<ComponentName />`
    }
  ],
  invalid: [
    {
      code:   `import { ComponentName } from '@patternfly/react-core'; <ComponentName propName="foo" />`,
      output: `import { ComponentName } from '@patternfly/react-core'; <ComponentName  />`,
      errors: [{
        message: `message`,
        type: "JSXOpeningElement",
      }]
    },
  ]
});
