const ruleTester = require('./ruletester');
const rule = require('../../lib/rules/refactor-breakpointmods');

ruleTester.run("refactor-breakpointmods", rule, {
  valid: [
    {
      code: `VALID_CODE_HERE`,
    }
  ],
  invalid: [
    {
      code:   `import { } from '@patternfly/react-core';`,
      output: `import { } from '@patternfly/react-core';`,
      errors: [{
        message: `YOUR_MESSAGE_HERE`,
        type: "JSXOpeningElement",
      }]
    },
  ]
});
