const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/warn-key-codes-removed");

ruleTester.run("warn-key-codes-removed", rule, {
  valid: [
    {
      // No @patternfly/react-core import
      code: `KEY_CODES`,
    },
  ],
  invalid: [
    {
      code: `import { KEY_CODES } from '@patternfly/react-core';`,
      output: `import { KEY_CODES } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The KEY_CODES constant has been removed. We suggest refactoring to use the KeyTypes constant instead.`,
          type: "ImportDeclaration",
        },
      ],
    },
  ],
});
