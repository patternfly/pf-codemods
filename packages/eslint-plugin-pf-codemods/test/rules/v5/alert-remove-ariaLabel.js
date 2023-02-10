const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/alert-remove-ariaLabel");

ruleTester.run("alert-remove-ariaLabel", rule, {
  valid: [
    {
      code: `<Alert anotherProp />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Alert aria-label="tester" />`,
    },
  ],
  invalid: [
    {
      code: `import { Alert } from '@patternfly/react-core'; <Alert aria-label="tester" />`,
      output: `import { Alert } from '@patternfly/react-core'; <Alert  />`,
      errors: [
        {
          message: `aria-label prop for Alert has been removed and should not be used as it is not well supported on div element without a role.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
