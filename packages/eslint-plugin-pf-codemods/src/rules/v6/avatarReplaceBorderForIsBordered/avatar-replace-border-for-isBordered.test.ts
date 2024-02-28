const ruleTester = require('../../ruletester');
import * as rule from './avatar-replace-border-for-isBordered';

ruleTester.run('avatar-replace-border-for-isBordered', rule, {
  valid: [
    {
      code: `<Avatar border={"dark"} />`,
    },
    {
      code: `import { Avatar } from '@patternfly/react-core'; <Avatar someOtherProp />`,
    },
  ],
  invalid: [
    {
      code: `import { Avatar } from '@patternfly/react-core'; <Avatar border={"dark"} />`,
      output: `import { Avatar } from '@patternfly/react-core'; <Avatar isBordered />`,
      errors: [
        {
          message: `border prop has been removed from Avatar since theming is not longer handled React-side. We recommend using the isBordered prop instead to add a border to Avatar.`,
          type: 'JSXOpeningElement',
        },
      ],
    },
  ],
});
