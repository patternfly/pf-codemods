const ruleTester = require('../ruletester');
const rule = require('../../lib/rules/no-unused-imports');

ruleTester.run("no-unused-imports", rule, {
  valid: [
    {
      code: `import { Nav, NavVariants } from '@patternfly/react-core'; <Nav variant={NavVariants.default} />`,
    }
  ],
  invalid: [
    {
      code:   `import { Nav, NavVariants } from '@patternfly/react-core'; <Nav variant="default" />`,
      output: `import { Nav  } from '@patternfly/react-core'; <Nav variant="default" />`,
      errors: [{
        message: `unused patternfly import NavVariants`,
        type: "ImportDeclaration",
      }]
    },
  ]
});
