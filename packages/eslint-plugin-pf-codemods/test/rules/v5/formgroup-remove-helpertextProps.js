const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/formgroup-remove-helpertextProps");

ruleTester.run("formgroup-remove-helpertextProps", rule, {
  valid: [
    {
      code: `import { FormGroup } from '@patternfly/react-core'; <FormGroup />`,
    },
    {
      code: `import { FormGroup } from '@patternfly/react-core/dist/esm/components/FormGroup/index.js'; <FormGroup />`,
    },
    // No @patternfly/react-core import
    { code: `<FormGroup 
        helperText="Upload a CSV file"
        helperTextInvalid="Must be a CSV file no larger than 1 KB"
        validated={isRejected ? 'error' : 'default'}
        helperTextIcon={<Icon />}
        helperTextInvalidIcon={<Icon2 />}
        isHelperTextBeforeField={false} 
      />` },
  ],
  invalid: [
    {
      code: `import { FormGroup } from '@patternfly/react-core'; <FormGroup helperText="Upload a CSV file" helperTextInvalid="Must be a CSV file no larger than 1 KB" validated={isRejected ? 'error' : 'default'} helperTextIcon={<Icon />} helperTextInvalidIcon={<Icon2 />} isHelperTextBeforeField={false} />`,
      output: `import { FormGroup } from '@patternfly/react-core'; <FormGroup helperText="Upload a CSV file" helperTextInvalid="Must be a CSV file no larger than 1 KB" validated={isRejected ? 'error' : 'default'} helperTextIcon={<Icon />} helperTextInvalidIcon={<Icon2 />} isHelperTextBeforeField={false} />`,
      errors: [
        {
          message: `helperText prop for FormGroup has been removed. Use FormHelperText, HelperText, and HelperTextItem directly inside children.`,
          type: "JSXOpeningElement",
        },
        {
          message: `helperTextInvalid prop for FormGroup has been removed. Use FormHelperText, HelperText, and HelperTextItem directly inside children.`,
          type: "JSXOpeningElement",
        },
        {
          message: `validated prop for FormGroup has been removed. Use FormHelperText, HelperText, and HelperTextItem directly inside children.`,
          type: "JSXOpeningElement",
        },
        {
          message: `helperTextIcon prop for FormGroup has been removed. Use FormHelperText, HelperText, and HelperTextItem directly inside children.`,
          type: "JSXOpeningElement",
        },
        {
          message: `helperTextInvalidIcon prop for FormGroup has been removed. Use FormHelperText, HelperText, and HelperTextItem directly inside children.`,
          type: "JSXOpeningElement",
        },
        {
          message: `isHelperTextBeforeField prop for FormGroup has been removed. Use FormHelperText, HelperText, and HelperTextItem directly inside children.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { FormGroup } from '@patternfly/react-core/dist/esm/components/FormGroup/index.js'; <FormGroup helperText="Upload a CSV file" helperTextInvalid="Must be a CSV file no larger than 1 KB" validated={isRejected ? 'error' : 'default'} helperTextIcon={<Icon />} helperTextInvalidIcon={<Icon2 />} isHelperTextBeforeField={false} />`,
      output: `import { FormGroup } from '@patternfly/react-core/dist/esm/components/FormGroup/index.js'; <FormGroup helperText="Upload a CSV file" helperTextInvalid="Must be a CSV file no larger than 1 KB" validated={isRejected ? 'error' : 'default'} helperTextIcon={<Icon />} helperTextInvalidIcon={<Icon2 />} isHelperTextBeforeField={false} />`,
      errors: [
        {
          message: `helperText prop for FormGroup has been removed. Use FormHelperText, HelperText, and HelperTextItem directly inside children.`,
          type: "JSXOpeningElement",
        },
        {
          message: `helperTextInvalid prop for FormGroup has been removed. Use FormHelperText, HelperText, and HelperTextItem directly inside children.`,
          type: "JSXOpeningElement",
        },
        {
          message: `validated prop for FormGroup has been removed. Use FormHelperText, HelperText, and HelperTextItem directly inside children.`,
          type: "JSXOpeningElement",
        },
        {
          message: `helperTextIcon prop for FormGroup has been removed. Use FormHelperText, HelperText, and HelperTextItem directly inside children.`,
          type: "JSXOpeningElement",
        },
        {
          message: `helperTextInvalidIcon prop for FormGroup has been removed. Use FormHelperText, HelperText, and HelperTextItem directly inside children.`,
          type: "JSXOpeningElement",
        },
        {
          message: `isHelperTextBeforeField prop for FormGroup has been removed. Use FormHelperText, HelperText, and HelperTextItem directly inside children.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
