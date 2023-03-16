const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/emptyState-rename-components");

ruleTester.run("emptyState-rename-components", rule, {
  valid: [
    {
      code: `import { EmptyStateActions } from '@patternfly/react-core';
      <>
        <EmptyStateActions>Primary action</EmptyStateActions>
        <EmptyStateActions>Other actions</EmptyStateActions>
      </>`,
    },
    {
      // No @patternfly/react-core import
      code: `<>
        <EmptyStatePrimary>Primary action</EmptyStatePrimary>
        <EmptyStateSecondaryActions>Other actions</EmptyStateSecondaryActions>
      </>`,
    },
  ],
  invalid: [
    {
      code: `import { EmptyStateSecondaryActions } from '@patternfly/react-core'; <EmptyStateSecondaryActions>Other actions</EmptyStateSecondaryActions>`,
      output: `import { EmptyStateSecondaryActions, EmptyStateActions } from '@patternfly/react-core'; <EmptyStateActions>Other actions</EmptyStateActions>`,
      errors: [
        {
          message: `add missing imports EmptyStateActions from @patternfly/react-core`,
          type: "ImportDeclaration",
        },
        {
          message:
            "EmptyStateSecondaryActions has been replaced with EmptyStateActions",
          type: "JSXIdentifier",
        },
        {
          message:
            "EmptyStateSecondaryActions has been replaced with EmptyStateActions",
          type: "JSXIdentifier",
        },
      ],
    },
    {
      code: `import { EmptyStatePrimary } from '@patternfly/react-core'; <EmptyStatePrimary>Primary action</EmptyStatePrimary>`,
      output: `import { EmptyStatePrimary, EmptyStateActions } from '@patternfly/react-core'; <EmptyStateActions>Primary action</EmptyStateActions>`,
      errors: [
        {
          message: `add missing imports EmptyStateActions from @patternfly/react-core`,
          type: "ImportDeclaration",
        },
        {
          message: "EmptyStatePrimary has been replaced with EmptyStateActions",
          type: "JSXIdentifier",
        },
        {
          message: "EmptyStatePrimary has been replaced with EmptyStateActions",
          type: "JSXIdentifier",
        },
      ],
    },
  ],
});
