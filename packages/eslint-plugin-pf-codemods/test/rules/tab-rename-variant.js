const ruleTester = require('./ruletester');
const rule = require('../../lib/rules/tab-rename-variant');

ruleTester.run("tab-rename-variant", rule, {
  valid: [
    {
      code: `<Tabs component="nav" />`,
    }
  ],
  invalid: [
    {
      code: `import { Tabs } from '@patternfly/react-core'; <Tabs variant="nav" />`,
      errors: [{
        message: 'variant prop has been renamed for Tabs. Use component prop instead',
        type: "JSXExpressionContainer"
      }]
    },
  ]
});
