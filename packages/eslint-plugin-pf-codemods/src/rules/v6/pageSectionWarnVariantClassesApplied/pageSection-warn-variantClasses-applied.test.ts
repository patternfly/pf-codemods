const ruleTester = require("../../ruletester");
import * as rule from "./pageSection-warn-variantClasses-applied";

ruleTester.run("pageSection-warn-variantClasses-applied", rule, {
  valid: [
    {
      code: `<PageSection variant="default" />`,
    },
    {
      code: `import { PageSection } from '@patternfly/react-core'; <PageSection someOtherProp />`,
    },
  ],
  invalid: [
    {
      code: `import { PageSection } from '@patternfly/react-core'; <PageSection variant="default" />`,
      output: `import { PageSection } from '@patternfly/react-core'; <PageSection variant="default" />`,
      errors: [
        {
          message: `Classes from the \`variant\` prop will now only be applied to PageSection when the \`type\` prop has a value of "default".`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
