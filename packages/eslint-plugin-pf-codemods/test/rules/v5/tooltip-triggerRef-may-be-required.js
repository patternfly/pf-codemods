const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/tooltip-triggerRef-may-be-required");

ruleTester.run("tooltip-triggerRef-may-be-required", rule, {
  valid: [
    {
      code: `import { Tooltip } from '@patternfly/react-core'; <Tooltip triggerRef={ref} />`,
    },
    {
      // if the tooltip has a reference prop it will be picked up by various-rename-reference
      code: `import { Tooltip } from '@patternfly/react-core'; <Tooltip reference={ref} />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Tooltip />`,
    },
  ],
  invalid: [
    {
      code: `import { Tooltip } from '@patternfly/react-core'; <Tooltip />`,
      output: `import { Tooltip } from '@patternfly/react-core'; <Tooltip />`,
      errors: [
        {
          message: `Tooltips without a \`triggerRef\` will now have a wrapping div which may cause issues. Snapshots may need to be updated, or to avoid the wrapping div add a \`triggerRef\` with a ref which is attached to the trigger element.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
