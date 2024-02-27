const ruleTester = require("../../ruletester");
import * as rule from "./tabs-renamed-isSecondary-prop";

ruleTester.run("tabs-renamed-isSecondary-prop", rule, {
  valid: [
    {
      code: `<Tabs isSecondary />`,
    },
    {
      code: `import { Tabs } from '@patternfly/react-core'; <Tabs someOtherProp />`,
    },
  ],
  invalid: [
    {
      code: `import { Tabs } from '@patternfly/react-core'; <Tabs isSecondary />`,
      output: `import { Tabs } from '@patternfly/react-core'; <Tabs isSubtab />`,
      errors: [
        {
          message: `The \`isSecondary\` prop for Tabs has been renamed to \`isSubtab\`.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
