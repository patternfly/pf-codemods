const ruleTester = require("../../ruletester");
import * as rule from "./button-rename-isActive";

ruleTester.run("button-rename-isActive", rule, {
  valid: [
    {
      code: `<Button isActive />`,
    },
    {
      code: `import { Button } from '@patternfly/react-core'; <Button someOtherProp />`,
    },
  ],
  invalid: [
    {
      code: `import { Button } from '@patternfly/react-core'; <Button isActive />`,
      output: `import { Button } from '@patternfly/react-core'; <Button isClicked />`,
      errors: [
        {
          message: `isActive prop for Button has been renamed to isClicked`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
