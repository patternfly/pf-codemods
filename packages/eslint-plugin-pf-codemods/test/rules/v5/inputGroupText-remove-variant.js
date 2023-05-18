const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/inputGroupText-remove-variant");

ruleTester.run("inputGroupText-remove-variant", rule, {
  valid: [
    {
      code: `import { InputGroupText } from '@patternfly/react-core'; <InputGroupText />`,
    },
    {
      code: `<InputGroupText variant />`,
    },
  ],
  invalid: [
    {
      code: `import { InputGroupText } from '@patternfly/react-core'; <InputGroupText variant />`,
      output: `import { InputGroupText } from '@patternfly/react-core'; <InputGroupText  />`,
      errors: [
        {
          message: `variant prop for InputGroupText has been removed`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { InputGroupText } from '@patternfly/react-core'; <InputGroupText variant={InputGroupTextVariant.plain} />`,
      output: `import { InputGroupText } from '@patternfly/react-core'; <InputGroupText  />`,
      errors: [
        {
          message: `variant prop for InputGroupText has been removed`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
