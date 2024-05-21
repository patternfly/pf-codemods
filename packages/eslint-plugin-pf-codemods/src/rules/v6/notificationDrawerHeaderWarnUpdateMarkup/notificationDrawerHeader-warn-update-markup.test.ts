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
      output: `import { NotificationDrawerHeader } from '@patternfly/react-core'; <NotificationDrawerHeader />`,
      errors: [
        {
          message: `NotificationDrawerHeader no longer uses our Text component internally, and instead renders a native \`h1\` element.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { NotificationDrawerHeader as CustomDrawerHeader } from '@patternfly/react-core'; <CustomDrawerHeader />`,
      output: `import { NotificationDrawerHeader as CustomDrawerHeader } from '@patternfly/react-core'; <CustomDrawerHeader />`,
      errors: [
        {
          message: `NotificationDrawerHeader no longer uses our Text component internally, and instead renders a native \`h1\` element.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { NotificationDrawerHeader } from '@patternfly/react-core/dist/esm/components/EmptyState/index.js'; <NotificationDrawerHeader />`,
      output: `import { NotificationDrawerHeader } from '@patternfly/react-core/dist/esm/components/EmptyState/index.js'; <NotificationDrawerHeader />`,
      errors: [
        {
          message: `NotificationDrawerHeader no longer uses our Text component internally, and instead renders a native \`h1\` element.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { NotificationDrawerHeader } from '@patternfly/react-core/dist/js/components/EmptyState/index.js'; <NotificationDrawerHeader />`,
      output: `import { NotificationDrawerHeader } from '@patternfly/react-core/dist/js/components/EmptyState/index.js'; <NotificationDrawerHeader />`,
      errors: [
        {
          message: `NotificationDrawerHeader no longer uses our Text component internally, and instead renders a native \`h1\` element.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { NotificationDrawerHeader } from '@patternfly/react-core/dist/dynamic/components/EmptyState/index.js'; <NotificationDrawerHeader />`,
      output: `import { NotificationDrawerHeader } from '@patternfly/react-core/dist/dynamic/components/EmptyState/index.js'; <NotificationDrawerHeader />`,
      errors: [
        {
          message: `NotificationDrawerHeader no longer uses our Text component internally, and instead renders a native \`h1\` element.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
