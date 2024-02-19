const ruleTester = require("../../ruletester");
import * as rule from "./jumpLinksItem-warn-prop-markup-updates";

ruleTester.run("jumpLinksItem-warn-prop-markup-updates", rule, {
  valid: [
    {
      code: `import { JumpLinksItem } from 'someOtherPackage';`,
    },
  ],
  invalid: [
    {
      code: `import { JumpLinksItem } from '@patternfly/react-core';`,
      output: `import { JumpLinksItem } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The \`href\` prop on JumpLinksItem is now required. Additionally, the markup for JumpLinksItem and the typing of the \`onClick\` property has been updated as it now uses our Button component internally.`,
          type: "ImportDeclaration",
        },
      ],
    },
  ],
});
