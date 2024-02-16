const ruleTester = require("../../ruletester");
import * as rule from "./pageSection-update-variant-values";

ruleTester.run("pageSection-update-variant-values", rule, {
  valid: [
    {
      code: `<PageSection variant="dark" />`,
    },
    {
      code: `import { PageSection } from '@patternfly/react-core'; <PageSection someOtherProp />`,
    },
    {
      code: `import { PageSection } from '@patternfly/react-core'; <PageSection variant="default" />`,
    },
    {
      code: `import { PageSection } from '@patternfly/react-core'; <PageSection variant="secondary" />`,
    },
  ],
  invalid: [
    {
      code: `import { PageSection } from '@patternfly/react-core'; <PageSection variant="dark" />`,
      output: `import { PageSection } from '@patternfly/react-core'; <PageSection  />`,
      errors: [
        {
          message: `The \`variant\` prop for PageSection now only accepts a value of "default" or "secondary". Running the fix for this rule will remove the prop so it uses the default value of "default".`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
