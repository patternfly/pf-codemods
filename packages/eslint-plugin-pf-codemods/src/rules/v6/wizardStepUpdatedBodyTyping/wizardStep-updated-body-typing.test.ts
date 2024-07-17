const ruleTester = require("../../ruletester");
import * as rule from "./wizardStep-updated-body-typing";

ruleTester.run("wizardStep-updated-body-typing", rule, {
  valid: [
    {
      code: `<WizardStep body={null} />`,
    },
    {
      code: `import { WizardStep } from '@patternfly/react-core'; <WizardStep body={{foo: "bar"}} />`,
    },
    {
      code: `import { WizardStep } from '@patternfly/react-core'; <WizardStep body={undefined} />`,
    },
  ],
  invalid: [
    {
      code: `import { WizardStep } from '@patternfly/react-core'; <WizardStep body={null} />`,
      output: `import { WizardStep } from '@patternfly/react-core'; <WizardStep  />`,
      errors: [
        {
          message: `The \`body\` prop on WizardStep no longer accepts a value of "null".`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { WizardStep } from '@patternfly/react-core'; const bodyProp = null; <WizardStep body={bodyProp} />`,
      output: `import { WizardStep } from '@patternfly/react-core'; const bodyProp = null; <WizardStep  />`,
      errors: [
        {
          message: `The \`body\` prop on WizardStep no longer accepts a value of "null".`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { WizardStep } from '@patternfly/react-core/dist/esm/components/Wizard/index.js'; <WizardStep body={null} />`,
      output: `import { WizardStep } from '@patternfly/react-core/dist/esm/components/Wizard/index.js'; <WizardStep  />`,
      errors: [
        {
          message: `The \`body\` prop on WizardStep no longer accepts a value of "null".`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { WizardStep } from '@patternfly/react-core/dist/js/components/Wizard/index.js'; <WizardStep body={null} />`,
      output: `import { WizardStep } from '@patternfly/react-core/dist/js/components/Wizard/index.js'; <WizardStep  />`,
      errors: [
        {
          message: `The \`body\` prop on WizardStep no longer accepts a value of "null".`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { WizardStep } from '@patternfly/react-core/dist/dynamic/components/Wizard/index.js'; <WizardStep body={null} />`,
      output: `import { WizardStep } from '@patternfly/react-core/dist/dynamic/components/Wizard/index.js'; <WizardStep  />`,
      errors: [
        {
          message: `The \`body\` prop on WizardStep no longer accepts a value of "null".`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
