const ruleTester = require('./ruletester');
const rule = require('../../lib/rules/wizard-text');

ruleTester.run("wizard-text", rule, {
  valid: [
    {
      code: `import { WizardNavItem } from '@patternfly/react-core'; <WizardNavItem hasGutter />`,
    },
    {
      // No @patternfly/react-core import
      code: `<WizardNavItem text="abc" />`,
    }
  ],
  invalid: [
    {
      code:   `import { WizardNavItem } from '@patternfly/react-core'; <WizardNavItem text="sm" />`,
      output: `import { WizardNavItem } from '@patternfly/react-core'; <WizardNavItem content="sm" />`,
      errors: [{
        message: "text prop has been removed for WizardNavItem. Use content instead",
        type: "JSXOpeningElement",
      }]
    }
  ]
});
