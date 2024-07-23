const ruleTester = require("../../ruletester");
import * as rule from "./component-groups-multi-content-card-remove-props";

const errors = ["leftBorderVariant", "withHeaderBorder"].map((prop) => ({
  message: `${prop} prop for MultiContentCard has been removed`,
  type: "JSXOpeningElement",
}));

ruleTester.run("component-groups-multi-content-card-remove-props", rule, {
  valid: [
    {
      code: `<MultiContentCard leftBorderVariant />`,
    },
    {
      code: `import { MultiContentCard } from '@patternfly/react-component-groups'; <MultiContentCard someOtherProp />`,
    },
  ],
  invalid: [
    {
      code: `import { MultiContentCard } from '@patternfly/react-component-groups'; <MultiContentCard leftBorderVariant="danger" withHeaderBorder/>`,
      output: `import { MultiContentCard } from '@patternfly/react-component-groups'; <MultiContentCard  />`,
      errors
    },
    {
      code: `import { MultiContentCard } from '@patternfly/react-component-groups'; const foo = "danger"; <MultiContentCard leftBorderVariant={foo} withHeaderBorder/>`,
      output: `import { MultiContentCard } from '@patternfly/react-component-groups'; const foo = "danger"; <MultiContentCard  />`,
      errors
    },
    {
      code: `import { MultiContentCard } from '@patternfly/react-component-groups/dist/js/MultiContentCard'; <MultiContentCard leftBorderVariant="danger" withHeaderBorder/>`,
      output: `import { MultiContentCard } from '@patternfly/react-component-groups/dist/js/MultiContentCard'; <MultiContentCard  />`,
      errors
    },
    {
      code: `import { MultiContentCard } from '@patternfly/react-component-groups/dist/esm/MultiContentCard'; <MultiContentCard leftBorderVariant="danger" withHeaderBorder/>`,
      output: `import { MultiContentCard } from '@patternfly/react-component-groups/dist/esm/MultiContentCard'; <MultiContentCard  />`,
      errors
    },
    {
      code: `import { MultiContentCard } from '@patternfly/react-component-groups/dist/dynamic/MultiContentCard'; <MultiContentCard leftBorderVariant="danger" withHeaderBorder/>`,
      output: `import { MultiContentCard } from '@patternfly/react-component-groups/dist/dynamic/MultiContentCard'; <MultiContentCard  />`,
      errors
    },
  ],
});
