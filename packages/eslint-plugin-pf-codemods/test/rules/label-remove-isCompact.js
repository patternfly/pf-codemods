const ruleTester = require('../ruletester');
const rule = require('../../lib/rules/label-remove-isCompact');

ruleTester.run("label-remove-isCompact", rule, {
  valid: [
    {
      code: `<Label isCompact />`,
    },
    {
      code: `<Label isCompact />`,
    }
  ],
  invalid: [
    {
      code:   `import { Label } from '@patternfly/react-core'; <Label isCompact>Label</Label>`,
      output: `import { Label } from '@patternfly/react-core'; <Label >Label</Label>`,
      errors: [{
        message: `isCompact prop for Label has been removed`,
        type: "JSXOpeningElement",
      }]
    },
  ]
});
