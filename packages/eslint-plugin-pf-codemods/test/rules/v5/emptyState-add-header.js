const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/emptyState-add-header");

ruleTester.run("emptyState-add-header", rule, {
  valid: [
    {
      code: `import { EmptyState, EmptyStateIcon, Title, EmptyStateBody, EmptyStateHeader } from '@patternfly/react-core'; 
      <EmptyState variant={EmptyStateVariant.xl}>
        <EmptyStateHeader titleText={"Empty state"} icon={<EmptyStateIcon icon={CubesIcon} />} headingLevel="h5"/>
        <EmptyStateBody>
          This represents an the empty state pattern in Patternfly 4. Hopefully it's simple enough to use but flexible
          enough to meet a variety of needs.
        </EmptyStateBody>
      </EmptyState>`,
    },
    {
      // No @patternfly/react-core import
      code: `<EmptyState variant={EmptyStateVariant.xl}>
        <EmptyStateIcon icon={CubesIcon} />
        <Title headingLevel="h5" size="4xl">
          Empty state
        </Title>
        <EmptyStateBody>
          This represents an the empty state pattern in Patternfly 4. Hopefully it's simple enough to use but flexible
          enough to meet a variety of needs.
        </EmptyStateBody>
      </EmptyState>`,
    },
  ],
  invalid: [
    {
      code: `import { EmptyState, EmptyStateIcon, Title, EmptyStateBody } from '@patternfly/react-core'; 
      <EmptyState variant={EmptyStateVariant.xl}>
        <EmptyStateIcon icon={CubesIcon} />
        <Title headingLevel="h5" size="4xl">
          Empty state
        </Title>
        <EmptyStateBody>
          This represents an the empty state pattern in Patternfly 4. Hopefully it's simple enough to use but flexible
          enough to meet a variety of needs.
        </EmptyStateBody>
      </EmptyState>`,
      output: `import { EmptyState, EmptyStateIcon, Title, EmptyStateBody, EmptyStateHeader } from '@patternfly/react-core'; 
      <EmptyState variant={EmptyStateVariant.xl}>
        <EmptyStateHeader titleText="Empty state" icon={<EmptyStateIcon icon={CubesIcon} />} headingLevel="h5"/>
        
        <EmptyStateBody>
          This represents an the empty state pattern in Patternfly 4. Hopefully it's simple enough to use but flexible
          enough to meet a variety of needs.
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
