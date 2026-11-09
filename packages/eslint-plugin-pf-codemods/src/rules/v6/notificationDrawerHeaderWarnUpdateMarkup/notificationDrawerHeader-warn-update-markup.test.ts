const ruleTester = require("../../ruletester");
import * as rule from "./notificationDrawerHeader-warn-update-markup";

ruleTester.run("notificationDrawerHeader-warn-update-markup", rule, {
  valid: [
    {
      code: `<NotificationDrawerHeader />`,
    },
  ],
  invalid: [
    {
      code: `import { NotificationDrawerHeader } from '@patternfly/react-core'; <NotificationDrawerHeader />`,
      output: null,
      errors: [
        {
          message: `NotificationDrawerHeader no longer uses our Text component internally, and instead renders a native \`h1\` element.`,
        },
      ],
    },
    {
      code: `import { NotificationDrawerHeader as CustomDrawerHeader } from '@patternfly/react-core'; <CustomDrawerHeader />`,
      output: null,
      errors: [
        {
          message: `NotificationDrawerHeader no longer uses our Text component internally, and instead renders a native \`h1\` element.`,
        },
      ],
    },
    {
      code: `import { NotificationDrawerHeader } from '@patternfly/react-core/dist/esm/components/EmptyState/index.js'; <NotificationDrawerHeader />`,
      output: null,
      errors: [
        {
          message: `NotificationDrawerHeader no longer uses our Text component internally, and instead renders a native \`h1\` element.`,
        },
      ],
    },
    {
      code: `import { NotificationDrawerHeader } from '@patternfly/react-core/dist/js/components/EmptyState/index.js'; <NotificationDrawerHeader />`,
      output: null,
      errors: [
        {
          message: `NotificationDrawerHeader no longer uses our Text component internally, and instead renders a native \`h1\` element.`,
        },
      ],
    },
    {
      code: `import { NotificationDrawerHeader } from '@patternfly/react-core/dist/dynamic/components/EmptyState/index.js'; <NotificationDrawerHeader />`,
      output: null,
      errors: [
        {
          message: `NotificationDrawerHeader no longer uses our Text component internally, and instead renders a native \`h1\` element.`,
        },
      ],
    },
  ],
});
