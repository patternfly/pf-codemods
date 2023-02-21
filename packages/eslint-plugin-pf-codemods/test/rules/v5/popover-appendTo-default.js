const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/popover-appendTo-default");

ruleTester.run("popover-appendTo-default", rule, {
  valid: [
    {
      // No @patternfly/react-core import
      code: `<Popover />`,
    },
  ],
  invalid: [
    {
      code: `import { Popover } from '@patternfly/react-core'; <Popover />`,
      output: `import { Popover } from '@patternfly/react-core'; <Popover />`,
      errors: [
        {
          message: `The default value of the Popover prop 'appendTo' has been updated to a value of "inline" and may cause markup changes that require updating selectors used in tests.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Popover as PfPopover } from '@patternfly/react-core'; <PfPopover />`,
      output: `import { Popover as PfPopover } from '@patternfly/react-core'; <PfPopover />`,
      errors: [
        {
          message: `The default value of the Popover prop 'appendTo' has been updated to a value of "inline" and may cause markup changes that require updating selectors used in tests.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
