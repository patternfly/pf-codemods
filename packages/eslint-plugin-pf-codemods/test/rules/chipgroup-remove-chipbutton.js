const ruleTester = require('../ruletester');
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
      output: `import { ChipButton, Button } from '@patternfly/react-core'; <Button>button</Button>`,
      errors: [
        {
          message: `add missing imports Button from @patternfly/react-core`,
          type: "ImportDeclaration",
        },
        {
          message: `ChipButton has been replaced with Button`,
          type: "JSXIdentifier",
        },
        {
          message: `ChipButton has been replaced with Button`,
          type: "JSXIdentifier",
        },
      ]
    },
  ]
});
