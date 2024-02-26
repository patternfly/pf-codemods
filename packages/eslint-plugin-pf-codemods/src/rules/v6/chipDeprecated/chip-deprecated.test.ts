const ruleTester = require('../../ruletester');
import * as rule from './chip-deprecated';

ruleTester.run('chip-deprecated', rule, {
  valid: [
    {
      code: `<Chip  />`,
    },
    {
      code: `import { Chip } from '@patternfly/react-core'; <Chip someOtherProp />`,
    },
  ],
  invalid: [
    {
      code: `import { Chip } from '@patternfly/react-core'; <Chip  />`,
      output: `import { Chip } from '@patternfly/react-core/deprecated'; <Chip  />`,
      errors: [
        {
          message: `Chip has been deprecated. Running the fix flag will update your imports to our deprecated package, but we suggest using Label.`,
          type: 'JSXOpeningElement',
        },
      ],
    },
  ],
});
