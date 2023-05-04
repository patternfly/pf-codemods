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
      errors: [
        {
          message: `The size, color, and noVerticalAlign properties have been removed from react-icons. Wrap your react-icon with the <Icon> component to customize its size and color.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
