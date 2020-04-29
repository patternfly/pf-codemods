const ruleTester = require('./ruletester');
const rule = require('../../lib/rules/promoted-components');

ruleTester.run("promoted-components", rule, {
  valid: [
    {
      code: `import { Divider } from '@patternfly/react-core';`,
    }
  ],
  invalid: [
    {
      code:   `import { Divider } from '@patternfly/react-core/dist/esm/experimental';`,
      output: `import { Divider } from '@patternfly/react-core';`,
      errors: [{
        message: `Divider has been promoted. Import it directly from @patternfly/react-core instead`,
        type: "ImportDeclaration",
      }]
    }
  ]
});
