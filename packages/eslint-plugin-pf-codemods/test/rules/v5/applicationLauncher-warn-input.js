const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/applicationLauncher-warn-input");

ruleTester.run("applicationLauncher-warn-input", rule, {
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
          message: `The internal input within ApplicationLauncher has been updated to use the PatternFly SearchInput. Any relative selectors, such as in unit tests, may need to be updated.`,
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `import { ApplicationLauncher as PFLauncher } from '@patternfly/react-core';`,
      output: `import { ApplicationLauncher as PFLauncher } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The internal input within ApplicationLauncher has been updated to use the PatternFly SearchInput. Any relative selectors, such as in unit tests, may need to be updated.`,
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `import { ApplicationLauncher as PFLauncher } from '@patternfly/react-core/dist/esm/components/ApplicationLauncher/index.js';`,
      output: `import { ApplicationLauncher as PFLauncher } from '@patternfly/react-core/dist/esm/components/ApplicationLauncher/index.js';`,
      errors: [
        {
          message: `The internal input within ApplicationLauncher has been updated to use the PatternFly SearchInput. Any relative selectors, such as in unit tests, may need to be updated.`,
          type: "ImportDeclaration",
        },
      ],
    },
  ],
});
