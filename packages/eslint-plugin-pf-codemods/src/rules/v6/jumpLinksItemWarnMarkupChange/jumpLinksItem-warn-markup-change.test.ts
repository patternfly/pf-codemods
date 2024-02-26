const ruleTester = require("../../ruletester");
import * as rule from "./jumpLinksItem-warn-markup-change";

ruleTester.run("jumpLinksItem-warn-markup-change", rule, {
  valid: [
    {
      code: `<JumpLinksItem />`,
    },
    {
      code: `import { JumpLinksItem } from '@someOtherPackage';`,
    },
  ],
  invalid: [
    {
      code: `import { JumpLinksItem } from '@patternfly/react-core'; <JumpLinksItem />`,
      output: `import { JumpLinksItem } from '@patternfly/react-core'; <JumpLinksItem />`,
      errors: [
        {
          message: `The markup for JumpLinksItem has changed, as it now uses our Button component internally. Additionally, the \`onClick\` prop type has been updated to just \`React.MouseEvent\` (previously \`React.MouseEvent<HTMLAnchorElement>\`).`,
          type: "ImportDeclaration",
        },
      ],
    },
  ],
});
