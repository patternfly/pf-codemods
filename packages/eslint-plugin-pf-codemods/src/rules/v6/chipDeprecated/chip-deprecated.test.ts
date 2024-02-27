const ruleTester = require('../../ruletester');
import * as rule from './chip-deprecated';

ruleTester.run('chip-deprecated', rule, {
  valid: [
    {
      code: `import { Chip } from '@someOtherPackage';`,
    },
  ],
  invalid: [
    {
      code: `import { Chip } from '@patternfly/react-core';`,
      output: `import { Chip } from '@patternfly/react-core/deprecated';`,
      errors: [
        {
          message: `Chip has been deprecated. Running the fix flag will update your imports to our deprecated package, but we suggest using Label instead.`,
          type: 'ImportDeclaration',
        },
      ],
    },
  ],
});
