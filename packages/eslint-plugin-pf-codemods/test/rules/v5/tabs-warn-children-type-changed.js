const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/tabs-warn-children-type-changed');

ruleTester.run("tabs-warn-children-type-changed", rule, {
  valid: [
    {
      code: `<Tabs>Child</Tabs>`,
    }
  ],
  invalid: [
    {
      code:   `import { Tabs } from '@patternfly/react-core';`,
      output: `import { Tabs } from '@patternfly/react-core';`,
      errors: [{
        message: `The children of the 'Tabs' component must now be passed a 'Tab' component or a falsy value.`,
        type: "ImportDeclaration",
      }]
    },
  ]
});
