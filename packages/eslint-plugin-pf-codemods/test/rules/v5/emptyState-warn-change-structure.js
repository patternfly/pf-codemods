const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/emptyState-warn-change-structure");

ruleTester.run("emptyState-warn-change-structure", rule, {
  valid: [
    {
      code: `import { Button, EmptyState, EmptyStateActions, EmptyStateBody, EmptyStateIcon, Title, EmptyStateHeader, EmptyStateFooter } from '@patternfly/react-core'; 
      <EmptyState>
        <EmptyStateHeader titleText="Empty state" icon={<EmptyStateIcon icon={CubesIcon} />} headingLevel="h5" />
        <EmptyStateBody>
          Some other content.
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
        <EmptyStateIcon icon={CubesIcon} />
        <Title headingLevel="h5" size="4xl">
          Empty state
        </Title>
        <EmptyStateBody>
          Some other content.
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
      code: `import { Button, EmptyState, EmptyStateActions, EmptyStateBody, EmptyStateIcon, Title } from '@patternfly/react-core'; 
      <EmptyState>
        <EmptyStateIcon icon={CubesIcon} />
        <Title headingLevel="h5" size="4xl">
          Empty state
        </Title>
        <EmptyStateBody>
          Some other content.
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
      output: `import { Button, EmptyState, EmptyStateActions, EmptyStateBody, EmptyStateIcon, Title, EmptyStateHeader, EmptyStateFooter } from '@patternfly/react-core'; 
      <EmptyState>
        <EmptyStateHeader titleText="Empty state" icon={<EmptyStateIcon icon={CubesIcon} />} headingLevel="h5" />
        <EmptyStateBody>
          Some other content.
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
          message: `add missing imports EmptyStateHeader, EmptyStateFooter from @patternfly/react-core`,
          type: "ImportDeclaration",
        },
        {
          message: `EmptyStateHeader component should be added instead of Title and EmptyStateIcon`,
          type: "JSXElement",
        },
        {
          message: `EmptyStateFooter component should be added to wrap content after EmptyStateBody`,
          type: "JSXElement",
        },
      ],
    },
  ],
});
