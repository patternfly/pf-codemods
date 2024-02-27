const ruleTester = require("../../ruletester");
import * as rule from "./tabs-replace-variant-light300";

ruleTester.run("tabs-replace-variant-light300", rule, {
  valid: [
    {
      code: `<Tabs variant="light300" />`,
    },
    {
      code: `import { Tabs } from '@patternfly/react-core'; <Tabs variant="secondary" />`,
    },
  ],
  invalid: [
    {
      code: `import { Tabs } from '@patternfly/react-core'; <Tabs variant="light300" />`,
      output: `import { Tabs } from '@patternfly/react-core'; <Tabs variant="secondary" />`,
      errors: [
        {
          message: `The "light300" value for the \`variant\` prop on Tabs has been replaced with the "secondary" value.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
