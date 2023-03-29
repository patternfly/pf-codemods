const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/emptyState-warn-add-footer");

ruleTester.run("emptyState-warn-add-footer", rule, {
  valid: [
    {
      code: `import { Button, EmptyState, EmptyStateBody, EmptyStateActions, EmptyStateFooter } from '@patternfly/react-core';
      <EmptyState>
        <EmptyStateBody>
          Some content
        </EmptyStateBody><EmptyStateFooter>
        <EmptyStateActions>
          <Button variant="primary">Primary action</Button>
        </EmptyStateActions>
        <EmptyStateActions>
          <Button variant="link">Multiple</Button>
          <Button variant="link">Action Buttons</Button>
          <Button variant="link">Here</Button>
        </EmptyStateActions>
      </EmptyStateFooter></EmptyState>`,
    },
    {
      // No @patternfly/react-core import
      code: `<EmptyState>
        <EmptyStateBody>
          Some content
        </EmptyStateBody>
        <EmptyStateActions>
          <Button variant="primary">Primary action</Button>
        </EmptyStateActions>
        <EmptyStateActions>
          <Button variant="link">Multiple</Button>
          <Button variant="link">Action Buttons</Button>
          <Button variant="link">Here</Button>
        </EmptyStateActions>
      </EmptyState>`,
    },
  ],
  invalid: [
    {
      code: `import { Button, EmptyState, EmptyStateBody, EmptyStateActions } from '@patternfly/react-core';
      <EmptyState>
        <EmptyStateBody>
          Some content
        </EmptyStateBody>
        <EmptyStateActions>
          <Button variant="primary">Primary action</Button>
        </EmptyStateActions>
        <EmptyStateActions>
          <Button variant="link">Multiple</Button>
          <Button variant="link">Action Buttons</Button>
          <Button variant="link">Here</Button>
        </EmptyStateActions>
      </EmptyState>`,
      output: `import { Button, EmptyState, EmptyStateBody, EmptyStateActions, EmptyStateFooter } from '@patternfly/react-core';
      <EmptyState>
        <EmptyStateBody>
          Some content
        </EmptyStateBody><EmptyStateFooter>
        <EmptyStateActions>
          <Button variant="primary">Primary action</Button>
        </EmptyStateActions>
        <EmptyStateActions>
          <Button variant="link">Multiple</Button>
          <Button variant="link">Action Buttons</Button>
          <Button variant="link">Here</Button>
        </EmptyStateActions>
      </EmptyStateFooter></EmptyState>`,
      errors: [
        {
          message: `add missing imports EmptyStateFooter from @patternfly/react-core`,
          type: "ImportDeclaration",
        },
        {
          message: `EmptyStateFooter component should be added to wrap content after EmptyStateBody`,
          type: "JSXElement",
        },
      ],
    },
  ],
});
