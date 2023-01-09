const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/expandable-section-rename-displaySize-large");

ruleTester.run("expandable-section-rename-displaySize-large", rule, {
  valid: [
    {
      code: `import { ExpandableSection } from '@patternfly/react-core'; <ExpandableSection displaySize="lg" />`,
    },
    {
      // No @patternfly/react-core import
      code: `<ExpandableSection displaySize="large" />`,
    },
  ],
  invalid: [
    {
      code: `import { ExpandableSection } from '@patternfly/react-core'; <ExpandableSection displaySize="large" />`,
      output: `import { ExpandableSection } from '@patternfly/react-core'; <ExpandableSection displaySize="lg" />`,
      errors: [{
        message: `displaySize "large" has been renamed for ExpandableSection. Use displaySize="lg" instead.`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});