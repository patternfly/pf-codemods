const ruleTester = require("../../ruletester");
import * as rule from "./pageHeaderToolsItem-remove-isSelected-prop";

ruleTester.run("pageHeaderToolsItem-remove-isSelected-prop", rule, {
  valid: [
    {
      code: `<PageHeaderToolsItem isSelected />`,
    },
    {
      code: `import { PageHeaderToolsItem } from '@patternfly/react-core/deprecated'; <PageHeaderToolsItem someOtherProp />`,
    },
  ],
  invalid: [
    {
      code: `import { PageHeaderToolsItem } from '@patternfly/react-core/deprecated'; <PageHeaderToolsItem isSelected />`,
      output: `import { PageHeaderToolsItem } from '@patternfly/react-core/deprecated'; <PageHeaderToolsItem  />`,
      errors: [
        {
          message: `The \`isSelected\` prop has been removed from PageHeaderToolsItem.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
