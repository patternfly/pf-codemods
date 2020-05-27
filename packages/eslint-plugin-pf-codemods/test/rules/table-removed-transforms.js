const ruleTester = require('./ruletester');
const rule = require('../../lib/rules/table-removed-transforms');

ruleTester.run("table-removed-transforms", rule, {
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
