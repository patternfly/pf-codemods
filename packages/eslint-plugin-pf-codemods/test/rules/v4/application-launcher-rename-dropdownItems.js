const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v4/application-launcher-rename-dropdownItems');

ruleTester.run("application-launcher-rename-dropdownItems", rule, {
  valid: [
    {
      code: `import { ApplicationLauncher } from '@patternfly/react-core'; <ApplicationLauncher />`,
    },
    {
      // No @patternfly/react-core import
      code: `<ApplicationLauncher dropdownItems={[]} />`,
    }
  ],
  invalid: [
    {
      code:   `import { ApplicationLauncher } from '@patternfly/react-core'; <ApplicationLauncher dropdownItems={[1,2,3]} />`,
      output: `import { ApplicationLauncher } from '@patternfly/react-core'; <ApplicationLauncher items={[1,2,3]} />`,
      errors: [{
        message: `dropdownItems prop for ApplicationLauncher has been renamed to items`,
        type: "JSXOpeningElement",
      }]
    },
  ]
});
