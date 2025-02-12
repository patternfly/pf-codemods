const ruleTester = require("../../ruletester");
import * as rule from "./expandableSection-remove-isActive-prop";

ruleTester.run("expandableSection-remove-isActive-prop", rule, {
  valid: [
    {
      code: `<ExpandableSection isActive />`,
    },
    {
      code: `import { ExpandableSection } from '@patternfly/react-core'; <ExpandableSection someOtherProp />`,
    },
  ],
  invalid: [
    // importing from react-core
    {
      code: `import { ExpandableSection } from '@patternfly/react-core'; <ExpandableSection isActive />`,
      output: `import { ExpandableSection } from '@patternfly/react-core'; <ExpandableSection  />`,
      errors: [
        {
          message: `The \`isActive\` prop has been removed from ExpandableSection.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    // importing from dist/dynamic
    {
      code: `import { ExpandableSection } from '@patternfly/react-core/dist/dynamic/components/ExpandableSection'; <ExpandableSection isActive />`,
      output: `import { ExpandableSection } from '@patternfly/react-core/dist/dynamic/components/ExpandableSection'; <ExpandableSection  />`,
      errors: [
        {
          message: `The \`isActive\` prop has been removed from ExpandableSection.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    // importing from dist/esm
    {
      code: `import { ExpandableSection } from '@patternfly/react-core/dist/esm/components/ExpandableSection'; <ExpandableSection isActive />`,
      output: `import { ExpandableSection } from '@patternfly/react-core/dist/esm/components/ExpandableSection'; <ExpandableSection  />`,
      errors: [
        {
          message: `The \`isActive\` prop has been removed from ExpandableSection.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    // importing from dist/js
    {
      code: `import { ExpandableSection } from '@patternfly/react-core/dist/js/components/ExpandableSection'; <ExpandableSection isActive />`,
      output: `import { ExpandableSection } from '@patternfly/react-core/dist/js/components/ExpandableSection'; <ExpandableSection  />`,
      errors: [
        {
          message: `The \`isActive\` prop has been removed from ExpandableSection.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
