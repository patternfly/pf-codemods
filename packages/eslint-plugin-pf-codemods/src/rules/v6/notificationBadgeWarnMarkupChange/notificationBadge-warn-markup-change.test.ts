const ruleTester = require('../../ruletester');
import * as rule from './notificationBadge-warn-markup-change';

ruleTester.run('notificationBadge-warn-markup-change', rule, {
  valid: [
    {
      code: `import { NotificationBadge } from '@someOtherPackage';`,
    },
  ],
  invalid: [
    {
      code: `import { NotificationBadge } from '@patternfly/react-core';`,
      output: `import { NotificationBadge } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The markup for NotificationBadge has changed, as it now uses stateful button internally.`,
          type: 'JSXOpeningElement',
        },
      ],
    },
  ],
});
