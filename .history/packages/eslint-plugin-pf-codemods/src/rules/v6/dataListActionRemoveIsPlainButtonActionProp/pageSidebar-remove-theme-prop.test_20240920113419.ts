const ruleTester = require("../../ruletester");
import * as rule from "./dataListAction-remove-theme-prop";

ruleTester.run("data-remove-theme-prop", rule, {
  valid: [
    {
      code: `<PageSidebar theme="dark" />`,
    },
    {
      code: `import { PageSidebar } from '@patternfly/react-core'; <PageSidebar someOtherProp />`,
    },
  ],
  invalid: [
    {
      code: `import { PageSidebar } from '@patternfly/react-core'; <PageSidebar theme="dark" />`,
      output: `import { PageSidebar } from '@patternfly/react-core'; <PageSidebar  />`,
      errors: [
        {
          message: `The \`theme\` prop has been removed from PageSidebar as theming is no longer handled React-side.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
