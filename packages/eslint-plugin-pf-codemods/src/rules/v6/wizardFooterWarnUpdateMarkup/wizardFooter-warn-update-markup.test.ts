const ruleTester = require("../../ruletester");
import * as rule from "./wizardFooter-warn-update-markup";

ruleTester.run("wizardFooter-warn-update-markup", rule, {
  valid: [
    {
      code: `<Wizard />`,
    },
    {
      code: `import { Wizard } from '@patternfly/react-core'; <Wizard footer={<CustomFooter />} />`,
    },
    {
      code: `import { Wizard, WizardStep } from '@patternfly/react-core'; <Wizard><WizardStep footer={<CustomFooter />} /><WizardStep footer={<CustomFooter />} /></Wizard>`,
    },
  ],
  invalid: [
    {
      code: `import { Wizard } from '@patternfly/react-core'; <Wizard />`,
      output: `import { Wizard } from '@patternfly/react-core'; <Wizard />`,
      errors: [
        {
          message: `The default WizardFooter now uses an ActionList wrapped around our Button components, rather than just our Button components.`,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { Wizard } from '@patternfly/react-core/dist/esm/components/Wizard/index.js'; <Wizard />`,
      output: `import { Wizard } from '@patternfly/react-core/dist/esm/components/Wizard/index.js'; <Wizard />`,
      errors: [
        {
          message: `The default WizardFooter now uses an ActionList wrapped around our Button components, rather than just our Button components.`,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { Wizard } from '@patternfly/react-core/dist/js/components/Wizard/index.js'; <Wizard />`,
      output: `import { Wizard } from '@patternfly/react-core/dist/js/components/Wizard/index.js'; <Wizard />`,
      errors: [
        {
          message: `The default WizardFooter now uses an ActionList wrapped around our Button components, rather than just our Button components.`,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { Wizard } from '@patternfly/react-core/dist/dynamic/components/Wizard/index.js'; <Wizard />`,
      output: `import { Wizard } from '@patternfly/react-core/dist/dynamic/components/Wizard/index.js'; <Wizard />`,
      errors: [
        {
          message: `The default WizardFooter now uses an ActionList wrapped around our Button components, rather than just our Button components.`,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { Wizard } from '@patternfly/react-core'; <Wizard><WizardStep /><WizardStep footer={<CustomFooter />} /></Wizard>`,
      output: `import { Wizard } from '@patternfly/react-core'; <Wizard><WizardStep /><WizardStep footer={<CustomFooter />} /></Wizard>`,
      errors: [
        {
          message: `The default WizardFooter now uses an ActionList wrapped around our Button components, rather than just our Button components.`,
          type: "JSXElement",
        },
      ],
    },
  ],
});
