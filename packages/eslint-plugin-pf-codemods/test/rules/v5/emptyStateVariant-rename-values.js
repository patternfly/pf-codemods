const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/emptyStateVariant-rename-values");

ruleTester.run("emptyStateVariant-rename-values", rule, {
  valid: [
    {
      code: `import { EmptyState, EmptyStateVariant } from '@patternfly/react-core'; 
      const myVariant = EmptyStateVariant.sm; 
      <EmptyState variant={EmptyStateVariant.lg} />`,
    },
    {
      // No @patternfly/react-core import
      code: `const myVariant = EmptyStateVariant.small; 
      <EmptyState variant={EmptyStateVariant.large} />`,
    },
  ],
  invalid: [
    {
      code: `import { EmptyState, EmptyStateVariant } from '@patternfly/react-core'; 
      const myVariant = EmptyStateVariant.small; 
      <EmptyState variant={EmptyStateVariant.large} />`,
      output: `import { EmptyState, EmptyStateVariant } from '@patternfly/react-core'; 
      const myVariant = EmptyStateVariant.sm; 
      <EmptyState variant={EmptyStateVariant.lg} />`,
      errors: [
        {
          message: `EmptyStateVariant enum value 'small' was renamed to 'sm'`,
          type: "MemberExpression",
        },
        {
          message: `EmptyStateVariant enum value 'large' was renamed to 'lg'`,
          type: "MemberExpression",
        },
      ],
    },
  ],
});
