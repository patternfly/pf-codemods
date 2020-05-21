const ruleTester = require('./ruletester');
const rule = require('../../lib/rules/wizard-rename-hasBodyPadding');

ruleTester.run("wizard-rename-hasBodyPadding", rule, {
  valid: [
    {
      code: `import { Wizard } from '@patternfly/react-core'; <Wizard hasNoBodyPadding />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Wizard hasNoBodyPadding />`,
    }
  ],
  invalid: [
    {
      code:   `import { Wizard } from '@patternfly/react-core'; <Wizard hasBodyPadding />`,
      output: `import { Wizard } from '@patternfly/react-core'; <Wizard hasNoBodyPadding />`,
      errors: [{
        message: "hasBodyPadding prop has been removed for Wizard. Use hasNoBodyPadding instead",
        type: "JSXOpeningElement",
      }]
    }
  ]
});