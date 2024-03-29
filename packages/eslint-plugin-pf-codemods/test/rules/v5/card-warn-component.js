const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/card-warn-component");

ruleTester.run("card-warn-component", rule, {
  valid: [
    {
      // No @patternfly/react-core import
      code: `import { Card } from 'Bar'; <Card />`,
    },
  ],
  invalid: [
    {
      code: `import { Card } from '@patternfly/react-core';`,
      output: `import { Card } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The internal default value of the component prop within Card has been changed from 'article' to 'div'. Any related references, such as in unit tests, may need to be updated.`,
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `import { Card } from '@patternfly/react-core/dist/esm/components/Card/index.js';`,
      output: `import { Card } from '@patternfly/react-core/dist/esm/components/Card/index.js';`,
      errors: [
        {
          message: `The internal default value of the component prop within Card has been changed from 'article' to 'div'. Any related references, such as in unit tests, may need to be updated.`,
          type: "ImportDeclaration",
        },
      ],
    },
  ],
});
