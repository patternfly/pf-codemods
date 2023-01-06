const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/simpleList-remove-isCurrent');

ruleTester.run("simpleList-remove-isCurrent", rule, {
  valid: [
    {
      code: `import { SimpleList } from '@patternfly/react-core'; <SimpleList isActive />`,
    },
    {
      // No @patternfly/react-core import
      code: `<SimpleList isCurrent />`,
    }
  ],
  invalid: [
    {
      code:   `import { SimpleList } from '@patternfly/react-core'; <SimpleList isCurrent />`,
      output: `import { SimpleList } from '@patternfly/react-core'; <SimpleList isActive />`,
      errors: [{
        message: `isCurrent prop has been removed for SimpleList and replaced with the isActive prop.`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
