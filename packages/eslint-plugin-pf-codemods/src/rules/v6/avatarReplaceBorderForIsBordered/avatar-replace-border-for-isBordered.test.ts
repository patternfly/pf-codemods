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
          message: `border prop has been removed since light and dark borders are no longer supported. isBordered prop was added to add a border to avatar.`,
          type: 'JSXOpeningElement',
        },
      ],
    },
  ],
});
