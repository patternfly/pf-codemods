const ruleTester = require('./ruletester');
const rule = require('../../lib/rules/rename-toolbar-components');

ruleTester.run("rename-toolbar-components", rule, {
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
