const ruleTester = require('./ruletester');
const rule = require('../../lib/rules/accordion-remove-noBoxShadow');

ruleTester.run("accordion-remove-noBoxShadow", rule, {
  valid: [
    {
      code: `import { Accordion } from '@patternfly/react-core'; <Accordion />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Accordion noBoxShadow />`,
    }
  ],
  invalid: [
    {
      code:   `import { Accordion } from '@patternfly/react-core'; <Accordion noBoxShadow />`,
      output: `import { Accordion } from '@patternfly/react-core'; <Accordion  />`,
      errors: [{
        message: `noBoxShadow prop has been removed for Accordion. If a shadow is needed, the accordion can be placed in a card, or a shadow can be applied either using CSS or a box-shadow utility class`,
        type: "JSXOpeningElement",
      }]
    },
  ]
});
