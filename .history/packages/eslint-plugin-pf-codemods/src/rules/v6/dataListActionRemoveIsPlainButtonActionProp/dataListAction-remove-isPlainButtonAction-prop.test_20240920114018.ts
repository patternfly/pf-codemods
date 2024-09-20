const ruleTester = require("../../ruletester");
import * as rule from "./dataListAction-remove-isPlainButtonAction-prop";

ruleTester.run("dataListAction-remove-isPlainButtonAction-prop", rule, {
  valid: [
    {
      code: `<DataListAction... theme="dark" />`,
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
