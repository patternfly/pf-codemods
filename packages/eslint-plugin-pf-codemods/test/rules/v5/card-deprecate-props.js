const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/card-deprecate-props");

ruleTester.run("card-deprecate-props", rule, {
  valid: [
    {
      code: `import { Card } from '@patternfly/react-core'; <Card isSelectable isDisabled />`,
    },
    // no @patternfly/react-core import
    {
      code: `<Card isSelectableRaised isDisabledRaised hasSelectableInput selectableInputAriaLabel onSelectableInputChange />`,
    },
  ],
  invalid: [
    {
      code: `import { Card } from '@patternfly/react-core'; <Card isSelectableRaised />`,
      output: `import { Card } from '@patternfly/react-core'; <Card isSelectable />`,
      errors: [
        {
          message: `The "isSelectableRaised" prop on Card has been deprecated. We recommend using our new implementation of clickable and selectable Cards instead.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Card } from '@patternfly/react-core'; <Card isDisabledRaised />`,
      output: `import { Card } from '@patternfly/react-core'; <Card isDisabled />`,
      errors: [
        {
          message: `The "isDisabledRaised" prop on Card has been deprecated. We recommend using our new implementation of clickable and selectable Cards instead.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    ...[
      "hasSelectableInput",
      "selectableInputAriaLabel",
      "onSelectableInputChange",
    ].map((inputProp) => ({
      code: `import { Card } from '@patternfly/react-core'; <Card ${inputProp} />`,
      output: `import { Card } from '@patternfly/react-core'; <Card ${inputProp} />`,
      errors: [
        {
          message: `The "${inputProp}" prop on Card has been deprecated. We recommend using our new implementation of clickable and selectable Cards instead.`,
          type: "JSXOpeningElement",
        },
      ],
    })),
    // Import from dist
    {
      code: `import { Card } from '@patternfly/react-core/dist/esm/components/Card/index.js'; <Card isSelectableRaised />`,
      output: `import { Card } from '@patternfly/react-core/dist/esm/components/Card/index.js'; <Card isSelectable />`,
      errors: [
        {
          message: `The "isSelectableRaised" prop on Card has been deprecated. We recommend using our new implementation of clickable and selectable Cards instead.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    // Aliased import
    {
      code: `import { Card as PFCard } from '@patternfly/react-core/dist/esm/components/Card/index.js'; <PFCard isSelectableRaised />`,
      output: `import { Card as PFCard } from '@patternfly/react-core/dist/esm/components/Card/index.js'; <PFCard isSelectable />`,
      errors: [
        {
          message: `The "isSelectableRaised" prop on PFCard has been deprecated. We recommend using our new implementation of clickable and selectable Cards instead.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    // Add tabIndex when applicable
    {
      code: `import { Card } from '@patternfly/react-core'; <Card isSelectableRaised hasSelectableInput />`,
      output: `import { Card } from '@patternfly/react-core'; <Card isSelectable hasSelectableInput tabIndex={0} />`,
      errors: [
        {
          message: `The "isSelectableRaised" prop on Card has been deprecated. We recommend using our new implementation of clickable and selectable Cards instead.`,
          type: "JSXOpeningElement",
        },
        {
          message: `The "hasSelectableInput" prop on Card has been deprecated. We recommend using our new implementation of clickable and selectable Cards instead.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
