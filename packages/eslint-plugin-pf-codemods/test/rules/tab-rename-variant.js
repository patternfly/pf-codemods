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
      output: `import { Tabs } from '@patternfly/react-core'; <Tabs component="nav" />`,
      errors: [{
        message: 'variant prop for Tabs has been renamed to component',
        type: "JSXOpeningElement"
      }]
    },
  ]
});
