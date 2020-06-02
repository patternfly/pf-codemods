const ruleTester = require('./ruletester');
const rule = require('../../lib/rules/chipgroup-remove-chipbutton');

ruleTester.run("chipgroup-remove-chipbutton", rule, {
  valid: [
    {
      code: `import { Button as ChipButton } from '@patternfly/react-core'; <ChipButton>button</ChipButton>`,
    },
    {
      code: `<Button>button</Button>`
    }
  ],
  invalid: [
    {
      code:   `import { ChipButton } from '@patternfly/react-core'; <ChipButton>button</ChipButton>`,
      output: `import { Button } from '@patternfly/react-core'; <Button>button</Button>`,
      errors: [
        {
          message: `ChipButton has been replaced with Button`,
          type: "ImportSpecifier",
        },
        {
          message: `ChipButton has been replaced with Button`,
          type: "JSXElement",
        },
        {
          message: `ChipButton has been replaced with Button`,
          type: "JSXElement",
        },
      ]
    },
  ]
});
