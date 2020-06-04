const ruleTester = require('../ruletester');
const rule = require('../../lib/rules/remove-gutter-size');

ruleTester.run("remove-gutter-size", rule, {
  valid: [
    {
      code: `import { Gallery } from '@patternfly/react-core'; <Gallery hasGutter />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Gallery hasGutter />`,
    }
  ],
  invalid: [
    {
      code:   `import { Gallery } from '@patternfly/react-core'; <Gallery gutter="sm" />`,
      output: `import { Gallery } from '@patternfly/react-core'; <Gallery hasGutter />`,
      errors: [{
        message: "gutter prop has been removed for Gallery. Use hasGutter instead",
        type: "JSXOpeningElement",
      }]
    }
  ]
});
