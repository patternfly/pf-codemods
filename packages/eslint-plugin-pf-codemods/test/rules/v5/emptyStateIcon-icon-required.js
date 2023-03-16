const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/emptyStateIcon-icon-required');

ruleTester.run("emptyStateIcon-icon-required", rule, {
  valid: [
    {
      code: `import { EmptyStateIcon } from '@patternfly/react-core'; <EmptyStateIcon icon={CubesIcon} />`,
    },
    {
      // No @patternfly/react-core import
      code: `<EmptyStateIcon />`,
    }
  ],
  invalid: [
    {
      code:   `import { EmptyStateIcon } from '@patternfly/react-core'; <EmptyStateIcon />`,
      output: `import { EmptyStateIcon } from '@patternfly/react-core'; <EmptyStateIcon />`,
      errors: [{
        message: `icon prop is now required on the EmptyStateIcon.`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
