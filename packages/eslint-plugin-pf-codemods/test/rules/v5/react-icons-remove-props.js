const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/react-icons-remove-props");

ruleTester.run("react-icons-remove-props", rule, {
  valid: [
    {
      code: `import { FrogIcon } from '@patternfly/react-icons'; <FrogIcon  />`,
    },
    {
      // No @patternfly/react-core import
      code: `<FrogIcon  />`,
    },
  ],
  invalid: [
    {
      code: `import { FrogIcon } from '@patternfly/react-icons'; <FrogIcon size color noVerticalAlign />`,
      output: `import { FrogIcon } from '@patternfly/react-icons'; <FrogIcon    />`,
      errors: [
        {
          message: `size prop for FrogIcon has been removed`,
          type: "JSXOpeningElement",
        },
        {
          message: `color prop for FrogIcon has been removed`,
          type: "JSXOpeningElement",
        },
        {
          message: `noVerticalAlign prop for FrogIcon has been removed`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
