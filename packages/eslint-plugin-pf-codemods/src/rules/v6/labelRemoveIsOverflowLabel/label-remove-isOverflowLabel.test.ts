const ruleTester = require('../../ruletester');
import * as rule from './label-remove-isOverflowLabel';

ruleTester.run("label-remove-isOverflowLabel", rule, {
  valid: [
    {
      code: `<Label isOverflowLabel />`
    },
    {
      code: `import { Label } from '@patternfly/react-core'; <Label someOtherProp />`
    }
  ],
  invalid: [
    {
      code:   `import { Label } from '@patternfly/react-core'; <Label isOverflowLabel />`,
      output: `import { Label } from '@patternfly/react-core'; <Label variant="overflow" />`,
      errors: [{
        message: `isOverflowLabel prop for Label has been replaced with variant="overflow"`,
        type: "JSXOpeningElement",
      }]
    },
  ]
});
  