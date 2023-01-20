const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/applicationLauncher-warn-input");

ruleTester.run("applicationLauncher-warn-input", rule, {
  valid: [],
  invalid: [
    {
      code: `import { ApplicationLauncher } from '@patternfly/react-core';`,
      output: `import { ApplicationLauncher } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The internal input within ApplicationLauncher has been updated to use the PatternFly SearchInput.`,
          type: "ImportDeclaration",
        },
      ],
    },
  ],
});
