const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/card-remove-isHoverable");

ruleTester.run("card-remove-isHoverable", rule, {
  valid: [
    {
      code: `import { Card } from '@patternfly/react-core'; <Card />`,
    },
    {
      code: `import { Card } from '@patternfly/react-core/dist/esm/components/Card/index.js'; <Card />`,
    },
    // No @patternfly/react-core import
    { code: "<Card isHoverable />" },
  ],
  invalid: [
    {
      code: `import { Card } from '@patternfly/react-core'; <Card isHoverable />`,
      output: `import { Card } from '@patternfly/react-core'; <Card  />`,
      errors: [
        {
          message: `isHoverable prop for Card has been removed and should be replaced with isSelectable or isSelectableRaised as needed.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Card } from '@patternfly/react-core/dist/esm/components/Card/index.js'; <Card isHoverable />`,
      output: `import { Card } from '@patternfly/react-core/dist/esm/components/Card/index.js'; <Card  />`,
      errors: [
        {
          message: `isHoverable prop for Card has been removed and should be replaced with isSelectable or isSelectableRaised as needed.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});