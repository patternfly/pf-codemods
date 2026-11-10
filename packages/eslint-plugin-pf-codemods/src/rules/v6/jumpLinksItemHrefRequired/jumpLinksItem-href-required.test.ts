const ruleTester = require("../../ruletester");
import * as rule from "./jumpLinksItem-href-required";

ruleTester.run("jumpLinksItem-href-required", rule, {
  valid: [
    {
      code: `import { JumpLinksItem } from 'someOtherPackage'; <JumpLinksItem />`,
    },
    {
      code: `import { JumpLinksItem } from '@patternfly/react-core'; <JumpLinksItem href="someURL" />`,
    },
  ],
  invalid: [
    {
      code: `import { JumpLinksItem } from '@patternfly/react-core'; <JumpLinksItem />`,
      output: null,
      errors: [
        {
          message: `The \`href\` prop on JumpLinksItem is now required.`,
        },
      ],
    },
    {
      code: `import { JumpLinksItem } from '@patternfly/react-core'; <JumpLinksItem href />`,
      output: null,
      errors: [
        {
          message: `The \`href\` prop on JumpLinksItem is now required.`,
        },
      ],
    },
  ],
});
