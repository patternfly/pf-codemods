const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/app-launcher-warn-input-change');

ruleTester.run("app-launcher-warn-input-change", rule, {
  valid: [
    {
      // No @patternfly/react-core import
      code: `<ApplicationLauncher />`,
    },
  ],
  invalid: [
    {
      code: `import { ApplicationLauncher } from '@patternfly/react-core';`,
      output: `import { ApplicationLauncher } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The input in ApplicationLauncher has been replaced with our SearchInput component. You may need to update unit tests or other references to the input.`,
          type: "ImportDeclaration",
        },
      ],
    },
  ],
});
