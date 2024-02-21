const ruleTester = require("../../ruletester");
import * as rule from "./label-remove-isOverflowLabel";

ruleTester.run("label-remove-isOverflowLabel", rule, {
  valid: [
    {
      code: `<Label isOverflowLabel />`,
    },
    {
      code: `import { Label } from '@patternfly/react-core'; <Label someOtherProp />`,
    },
  ],
  invalid: [
    {
      code: `import { Label } from '@patternfly/react-core'; <Label isOverflowLabel />`,
      output: `import { Label } from '@patternfly/react-core'; <Label variant="overflow" />`,
      errors: [
        {
          message:
            'The `isOverflowLabel` prop for Label has been replaced with `variant="overflow"`.',
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Label } from '@patternfly/react-core'; <Label isOverflowLabel variant="outline" />`,
      output: `import { Label } from '@patternfly/react-core'; <Label variant="overflow"  />`,
      errors: [
        {
          message:
            'The `isOverflowLabel` prop for Label has been replaced with `variant="overflow"`. Running the fix for this rule will replace an existing `variant` prop (which had no effect if `isOverflowLabel` was used).',
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
