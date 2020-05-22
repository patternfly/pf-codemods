const ruleTester = require('./ruletester');
const rule = require('../../lib/rules/chipgroup-remove-chipbutton');

ruleTester.run("chipgroup-remove-chipbutton", rule, {
  valid: [
    {
      code: `import { ChipButton } from '@patternfly/react-core'; <Button>button</Button>`,
    },
    {
      code: `<ChipButton>button</ChipButton>`
    }
  ],
  invalid: [
    {
      code:   `import { ChipButton } from '@patternfly/react-core'; <ChipButton>button</ChipButton>`,
      output: `import { ChipButton } from '@patternfly/react-core'; <Button>button</Button>`,
      errors: [
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
