const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/emptyState-warn-add-header");

ruleTester.run("emptyState-warn-add-header", rule, {
  valid: [
    {
      code: `import { EmptyState, EmptyStateIcon, Title, EmptyStateBody, EmptyStateHeader } from '@patternfly/react-core'; 
      <EmptyState>
        <EmptyStateHeader titleText="Empty state" icon={<EmptyStateIcon icon={CubesIcon} />} headingLevel="h5" />
        <EmptyStateBody>
          Some other content.
        </EmptyStateBody>
      </EmptyState>`,
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
      </EmptyState>`,
    },
  ],
  invalid: [
    {
      code: `import { EmptyState, EmptyStateIcon, Title, EmptyStateBody } from '@patternfly/react-core'; 
      <EmptyState>
        <EmptyStateIcon icon={CubesIcon} />
        <Title headingLevel="h5" size="4xl">
          Empty state
        </Title>
        <EmptyStateBody>
          Some other content.
        </EmptyStateBody>
      </EmptyState>`,
      output: `import { EmptyState, EmptyStateIcon, Title, EmptyStateBody, EmptyStateHeader } from '@patternfly/react-core'; 
      <EmptyState>
        <EmptyStateHeader titleText="Empty state" icon={<EmptyStateIcon icon={CubesIcon} />} headingLevel="h5" />
        <EmptyStateBody>
          Some other content.
        </EmptyStateBody>
      </EmptyState>`,
      errors: [
        {
          message: `add missing imports EmptyStateHeader from @patternfly/react-core`,
          type: "ImportDeclaration",
        },
        {
          message: `EmptyStateHeader component should be added instead of Title and EmptyStateIcon`,
          type: "JSXElement",
        },
      ],
    },
  ],
});
