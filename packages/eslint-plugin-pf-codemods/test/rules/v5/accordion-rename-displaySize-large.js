const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/accordion-rename-displaySize-large");

ruleTester.run("accordion-rename-displaySize-large", rule, {
  valid: [
    {
      code: `import { Accordion } from '@patternfly/react-core'; <Accordion displaySize="lg" />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Accordion displaySize="large" />`,
    },
  ],
  invalid: [
    {
      code: `import { Accordion } from '@patternfly/react-core'; <Accordion displaySize="large" />`,
      output: `import { Accordion } from '@patternfly/react-core'; <Accordion displaySize="lg" />`,
      errors: [{
        message: `displaySize "large" has been renamed for Accordion. Use displaySize="lg" instead.`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});