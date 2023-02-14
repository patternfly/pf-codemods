const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/notificationBadge-remove-isRead');

ruleTester.run("notificationBadge-remove-isRead", rule, {
  valid: [
    {
      code: `import { NotificationBadge } from '@patternfly/react-core'; <NotificationBadge variant="read" />`,
    },
    {
      // No @patternfly/react-core import
      code: `<NotificationBadge isRead />`,
    }
  ],
  invalid: [
    {
      code:   `import { NotificationBadge } from '@patternfly/react-core'; <NotificationBadge isRead />`,
      output: `import { NotificationBadge } from '@patternfly/react-core'; <NotificationBadge variant="read" />`,
      errors: [{
        message: `the isRead prop on NotificationBadge has been removed, use variant prop with "read" or "unread"`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { NotificationBadge } from '@patternfly/react-core'; <NotificationBadge baz isRead={true} />`,
      output: `import { NotificationBadge } from '@patternfly/react-core'; <NotificationBadge baz variant="read" />`,
      errors: [{
        message: `the isRead prop on NotificationBadge has been removed, use variant prop with "read" or "unread"`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { NotificationBadge } from '@patternfly/react-core'; <NotificationBadge baz isRead={false} />`,
      output: `import { NotificationBadge } from '@patternfly/react-core'; <NotificationBadge baz variant="unread" />`,
      errors: [{
        message: `the isRead prop on NotificationBadge has been removed, use variant prop with "read" or "unread"`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { NotificationBadge } from '@patternfly/react-core'; <NotificationBadge bar isRead={isRead} />`,
      output: `import { NotificationBadge } from '@patternfly/react-core'; <NotificationBadge bar variant={isRead ? "read" : "unread"} />`,
      errors: [{
        message: `the isRead prop on NotificationBadge has been removed, use variant prop with "read" or "unread"`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { NotificationBadge } from '@patternfly/react-core'; <NotificationBadge foo isRead={info.read || info.markedRead} />`,
      output: `import { NotificationBadge } from '@patternfly/react-core'; <NotificationBadge foo variant={(info.read || info.markedRead) ? "read" : "unread"} />`,
      errors: [{
        message: `the isRead prop on NotificationBadge has been removed, use variant prop with "read" or "unread"`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
