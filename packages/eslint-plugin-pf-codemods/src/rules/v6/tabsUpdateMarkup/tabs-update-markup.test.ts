const ruleTester = require("../../ruletester");
import * as rule from "./tabs-update-markup";

ruleTester.run("tabs-update-markup", rule, {
  valid: [
    {
      code: `import { Tabs } from 'someOtherPackage';`,
    },
  ],
  invalid: [
    {
      code: `import { Tabs } from '@patternfly/react-core';`,
      output: `import { Tabs } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The markup for the Tabs scroll buttons has been updated. They are now rendered with a div wrapper, use our Button component, and no longer have adjusted styling when the \`isSubtab\` prop is true.`,
          type: "ImportDeclaration",
        },
      ],
    },
  ],
});
