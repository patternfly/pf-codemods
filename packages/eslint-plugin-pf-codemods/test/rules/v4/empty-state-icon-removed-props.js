const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v4/empty-state-icon-removed-props');

ruleTester.run("empty-state-icon-removed-props", rule, {
  valid: [
    {
      code: `import { EmptyStateIcon } from '@patternfly/react-core'; <EmptyStateIcon icon={SearchIcon} />`,
    }
  ],
  invalid: [
    {
      code:   `import { EmptyStateIcon } from '@patternfly/react-core'; <EmptyStateIcon size="sm" title="title" />`,
      output: `import { EmptyStateIcon } from '@patternfly/react-core'; <EmptyStateIcon   />`,
      errors: [
        {
          message: `Removed prop size from EmptyStateIcon. Use the icon prop instead.`,
          type: "JSXOpeningElement",
        },
        {
          message: `Removed prop title from EmptyStateIcon. Use the icon prop instead.`,
          type: "JSXOpeningElement",
        },
      ]
    },
  ]
});
