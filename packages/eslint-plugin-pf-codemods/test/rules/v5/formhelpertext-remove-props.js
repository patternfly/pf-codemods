const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/formhelpertext-remove-props");

ruleTester.run("formhelpertext-remove-props", rule, {
  valid: [
    {
      code: `import { FormHelperText } from '@patternfly/react-core'; <FormHelperText />`,
    },
    // No @patternfly/react-core import
    { code: `<FormHelperText 
        isError={true}
        isHidden={false}
        icon={<Icon />}
        component="div"
      />` },
  ],
  invalid: [
    {
      code: `import { FormHelperText } from '@patternfly/react-core'; <FormHelperText isError={true} isHidden={false} icon={<Icon />} component="div" />`,
      output: `import { FormHelperText } from '@patternfly/react-core'; <FormHelperText     />`,
      errors: [
        {
          message: `isError prop for FormHelperText has been removed. Use HelperText and HelperTextItem directly in children.`,
          type: "JSXOpeningElement",
        },
        {
          message: `isHidden prop for FormHelperText has been removed. Use HelperText and HelperTextItem directly in children.`,
          type: "JSXOpeningElement",
        },
        {
          message: `icon prop for FormHelperText has been removed. Use HelperText and HelperTextItem directly in children.`,
          type: "JSXOpeningElement",
        },
        {
          message: `component prop for FormHelperText has been removed. Use HelperText and HelperTextItem directly in children.`,
          type: "JSXOpeningElement",
        }
      ],
    },
  ],
});
