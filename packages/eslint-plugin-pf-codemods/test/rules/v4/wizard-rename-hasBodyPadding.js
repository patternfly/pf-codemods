const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v4/wizard-rename-hasBodyPadding');

ruleTester.run("wizard-rename-hasBodyPadding", rule, {
  valid: [
    {
      code: `import { Wizard } from '@patternfly/react-core'; <Wizard hasNoBodyPadding />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Wizard hasBodyPadding={false} />`,
    }
  ],
  invalid: [
    {
      code:   `import { Wizard } from '@patternfly/react-core'; <Wizard hasBodyPadding={false} />`,
      output: `import { Wizard } from '@patternfly/react-core'; <Wizard hasNoBodyPadding />`,
      errors: [{
        message: `hasBodyPadding prop has been removed for Wizard. Use hasNoBodyPadding instead`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { Wizard } from '@patternfly/react-core'; <Wizard hasBodyPadding={true} />`,
      output: `import { Wizard } from '@patternfly/react-core'; <Wizard  />`,
      errors: [{
        message: `hasBodyPadding prop has been removed for Wizard. Use hasNoBodyPadding instead`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { Wizard } from '@patternfly/react-core'; <Wizard hasBodyPadding />`,
      output: `import { Wizard } from '@patternfly/react-core'; <Wizard  />`,
      errors: [{
        message: `hasBodyPadding prop has been removed for Wizard. Use hasNoBodyPadding instead`,
        type: "JSXOpeningElement",
      }]
    },
  ]
});
