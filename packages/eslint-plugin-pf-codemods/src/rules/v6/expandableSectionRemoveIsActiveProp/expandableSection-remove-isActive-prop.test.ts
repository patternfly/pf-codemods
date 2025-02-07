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
  ],
});
