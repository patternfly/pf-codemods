const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/key-codes-removed");

ruleTester.run("key-codes-removed", rule, {
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
    {
      code: `import { KEY_CODES } from '@patternfly/react-core/dist/esm/helpers/constants.js';`,
      output: `import { KEY_CODES } from '@patternfly/react-core/dist/esm/helpers/constants.js';`,
      errors: [
        {
          message: `The KEY_CODES constant has been removed. We suggest refactoring to use the KeyTypes constant instead.`,
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `export { KEY_CODES as CustomKeyCodes } from '@patternfly/react-core';`,
      output: `export { KEY_CODES as CustomKeyCodes } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The KEY_CODES constant has been removed. We suggest refactoring to use the KeyTypes constant instead.`,
          type: "ExportNamedDeclaration",
        },
      ],
    },
    {
      code: `export { KEY_CODES as CustomKeyCodes } from '@patternfly/react-core/dist/esm/helpers/constants.js';`,
      output: `export { KEY_CODES as CustomKeyCodes } from '@patternfly/react-core/dist/esm/helpers/constants.js';`,
      errors: [
        {
          message: `The KEY_CODES constant has been removed. We suggest refactoring to use the KeyTypes constant instead.`,
          type: "ExportNamedDeclaration",
        },
      ],
    },
  ],
});
