const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/wizard-warn-button-order");

ruleTester.run("wizard-warn-button-order", rule, {
  valid: [
    {
      code: `import {Wizard} from '@patternfly/react-core/next';`,
    },
    {
      code: `import {Wizard} from '@patternfly/react-core/dist/esm/next/components/Wizard/index.js';`,
    },
    {
      code: `import {WizardFooter} from '@patternfly/react-core';`,
    },
    {
      code: `import {WizardFooter} from '@patternfly/react-core/dist/esm/components/Wizard/index.js';`,
    },
  ],
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
    {
      code: `import {Wizard} from '@patternfly/react-core/dist/esm/components/Wizard/index.js';`,
      errors: [
        {
          message: `The order of the "next" and "back" buttons in the Wizard has been updated, with the "next" button now coming after the "back" button.`,
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `import {WizardFooter} from '@patternfly/react-core/dist/esm/next/components/Wizard/index.js';`,
      errors: [
        {
          message: `The order of the "next" and "back" buttons in the WizardFooter has been updated, with the "next" button now coming after the "back" button.`,
          type: "ImportDeclaration",
        },
      ],
    },
  ],
});
