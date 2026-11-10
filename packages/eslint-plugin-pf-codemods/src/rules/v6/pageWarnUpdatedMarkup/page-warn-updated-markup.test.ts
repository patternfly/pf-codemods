const ruleTester = require("../../ruletester");
import * as rule from "./page-warn-updated-markup";

ruleTester.run("page-warn-updated-markup", rule, {
  valid: [
    {
      code: `<Page horizontalSubnav breadcrumb />`,
    },
    {
      code: `import { Page } from '@patternfly/react-core'; <Page someOtherProp />`,
    },
  ],
  invalid: [
    {
      code: `import { Page } from '@patternfly/react-core'; <Page horizontalSubnav />`,
      output: null,
      errors: [
        {
          message: `The markup for Page has changed. When either the \`horizontalSubnav\` or \`breadcrumb\` props are passed, a PageBody component will always wrap the contents.`,
        },
      ],
    },
    {
      code: `import { Page } from '@patternfly/react-core'; <Page breadcrumb />`,
      output: null,
      errors: [
        {
          message: `The markup for Page has changed. When either the \`horizontalSubnav\` or \`breadcrumb\` props are passed, a PageBody component will always wrap the contents.`,
        },
      ],
    },
    {
      code: `import { Page } from '@patternfly/react-core'; <Page horizontalSubnav breadcrumb />`,
      output: null,
      errors: [
        {
          message: `The markup for Page has changed. When either the \`horizontalSubnav\` or \`breadcrumb\` props are passed, a PageBody component will always wrap the contents.`,
        },
      ],
    },
    {
      code: `import { Page as CustomThing } from '@patternfly/react-core'; <CustomThing horizontalSubnav />`,
      output: null,
      errors: [
        {
          message: `The markup for Page has changed. When either the \`horizontalSubnav\` or \`breadcrumb\` props are passed, a PageBody component will always wrap the contents.`,
        },
      ],
    },
    {
      code: `import { Page } from '@patternfly/react-core/dist/esm/components/Page/index.js'; <Page horizontalSubnav />`,
      output: null,
      errors: [
        {
          message: `The markup for Page has changed. When either the \`horizontalSubnav\` or \`breadcrumb\` props are passed, a PageBody component will always wrap the contents.`,
        },
      ],
    },
    {
      code: `import { Page } from '@patternfly/react-core/dist/js/components/Page/index.js'; <Page horizontalSubnav />`,
      output: null,
      errors: [
        {
          message: `The markup for Page has changed. When either the \`horizontalSubnav\` or \`breadcrumb\` props are passed, a PageBody component will always wrap the contents.`,
        },
      ],
    },
    {
      code: `import { Page } from '@patternfly/react-core/dist/dynamic/components/Page/index.js'; <Page horizontalSubnav />`,
      output: null,
      errors: [
        {
          message: `The markup for Page has changed. When either the \`horizontalSubnav\` or \`breadcrumb\` props are passed, a PageBody component will always wrap the contents.`,
        },
      ],
    },
  ],
});
