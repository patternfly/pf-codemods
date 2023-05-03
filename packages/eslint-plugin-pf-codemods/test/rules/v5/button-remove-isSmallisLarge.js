const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/button-remove-isSmallisLarge');

ruleTester.run("button-remove-isSmallisLarge", rule, {
  valid: [
    {
      code: `import { Button } from '@patternfly/react-core'; <Button size />`,
    },
    {
      code: `import { Button } from '@patternfly/react-core/dist/esm/components/Button/index.js'; <Button size />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Button isSmall isLarge />`,
    }
  ],
  invalid: [
    {
      code:   `import { Button } from '@patternfly/react-core'; <Button isSmall={true} />`,
      output: `import { Button } from '@patternfly/react-core'; <Button size="sm" />`,
      errors: [{
        message: `use size="sm" instead of isSmall prop for Button`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { Button } from '@patternfly/react-core'; <Button isLarge />`,
      output: `import { Button } from '@patternfly/react-core'; <Button size="lg" />`,
      errors: [{
        message: `use size="lg" instead of isLarge prop for Button`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { Button } from '@patternfly/react-core/dist/esm/components/Button/index.js'; <Button isSmall />`,
      output: `import { Button } from '@patternfly/react-core/dist/esm/components/Button/index.js'; <Button size="sm" />`,
      errors: [{
        message: `use size="sm" instead of isSmall prop for Button`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { Button } from '@patternfly/react-core/dist/esm/components/Button/index.js'; <Button isLarge />`,
      output: `import { Button } from '@patternfly/react-core/dist/esm/components/Button/index.js'; <Button size="lg" />`,
      errors: [{
        message: `use size="lg" instead of isLarge prop for Button`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
