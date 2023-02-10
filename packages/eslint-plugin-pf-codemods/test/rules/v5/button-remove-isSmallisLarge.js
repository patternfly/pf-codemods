const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/button-remove-isSmallisLarge');

ruleTester.run("button-remove-isSmallisLarge", rule, {
  valid: [
    {
      code: `import { Button } from '@patternfly/react-core'; <Button size />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Button isSmall isLarge />`,
    }
  ],
  invalid: [
    {
      code:   `import { Button } from '@patternfly/react-core'; <Button isSmall />`,
      output: `import { Button } from '@patternfly/react-core'; <Button size="sm" />`,
      errors: [{
        message: `isSmall prop for Button has been renamed to size="sm"`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { Button } from '@patternfly/react-core'; <Button isLarge />`,
      output: `import { Button } from '@patternfly/react-core'; <Button size="lg" />`,
      errors: [{
        message: `isLarge prop for Button has been renamed to size="lg"`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
