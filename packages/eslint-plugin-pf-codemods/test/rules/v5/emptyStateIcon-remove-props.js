const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/emptyStateIcon-remove-props");

ruleTester.run("emptyStateIcon-remove-props", rule, {
  valid: [
    {
      code: `import { EmptyStateIcon } from '@patternfly/react-core'; <><EmptyStateIcon icon={Spinner} /><EmptyStateIcon icon={CubesIcon} /></>`,
    },
    {
      // No @patternfly/react-core import
      code: `<><EmptyStateIcon component={Spinner} variant="container"/><EmptyStateIcon icon={CubesIcon} variant="icon"/></>`,
    },
  ],
  invalid: [
    {
      code: `import { EmptyStateIcon } from '@patternfly/react-core'; <EmptyStateIcon icon={CubesIcon} variant="icon"/>`,
      output: `import { EmptyStateIcon } from '@patternfly/react-core'; <EmptyStateIcon icon={CubesIcon} />`,
      errors: [
        {
          message: `variant prop for EmptyStateIcon has been removed`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { EmptyStateIcon } from '@patternfly/react-core'; <EmptyStateIcon component={Spinner} variant="container"/>`,
      output: `import { EmptyStateIcon } from '@patternfly/react-core'; <EmptyStateIcon icon={Spinner} />`,
      errors: [
        {
          message: `component prop for EmptyStateIcon has been renamed to icon`,
          type: "JSXOpeningElement",
        },
        {
          message: `variant prop for EmptyStateIcon has been removed`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
