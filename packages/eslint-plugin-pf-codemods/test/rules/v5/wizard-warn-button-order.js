const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/wizard-warn-button-order");

ruleTester.run("wizard-warn-button-order", rule, {
  valid: [],
  invalid: [
    {
      code: `import {Wizard} from '@patternfly/react-core';`,
      output: `import {Wizard} from '@patternfly/react-core';`,
      errors: [
        {
          message: `The order of the "next" and "back" buttons in the Wizard has been updated, with the "next" button now coming after the "back" button.`,
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `import {WizardFooter} from '@patternfly/react-core/next';`,
      output: `import {WizardFooter} from '@patternfly/react-core/next';`,
      errors: [
        {
          message: `The order of the "next" and "back" buttons in the WizardFooter has been updated, with the "next" button now coming after the "back" button.`,
          type: "ImportDeclaration",
        },
      ],
    },
  ],
});
