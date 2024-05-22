const ruleTester = require("../../ruletester");
import * as rule from "./wizardNavItem-warn-update-markup";

ruleTester.run("wizardNavItem-warn-update-markup", rule, {
  valid: [
    {
      code: `<WizardNavItem />`,
    },
    {
      code: `<WizardNavItem status="error" />`,
    },
  ],
  invalid: [
    {
      code: `import { WizardNavItem } from '@patternfly/react-core'; <WizardNavItem />`,
      output: `import { WizardNavItem } from '@patternfly/react-core'; <WizardNavItem />`,
      errors: [
        {
          message: `There is now a wrapper element with class \`pf-v6-c-wizard__nav-link-main\` rendered around the nav item content.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { WizardNavItem as CustomNavItem } from '@patternfly/react-core'; <CustomNavItem />`,
      output: `import { WizardNavItem as CustomNavItem } from '@patternfly/react-core'; <CustomNavItem />`,
      errors: [
        {
          message: `There is now a wrapper element with class \`pf-v6-c-wizard__nav-link-main\` rendered around the nav item content.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { WizardNavItem } from '@patternfly/react-core'; <WizardNavItem status="error" />`,
      output: `import { WizardNavItem } from '@patternfly/react-core'; <WizardNavItem status="error" />`,
      errors: [
        {
          message: `There is now a wrapper element with class \`pf-v6-c-wizard__nav-link-main\` rendered around the nav item content. Additionally, when the nav item has a status of "error" the icon will be rendered before the item content, and the WizardToggle will also now render an error icon.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { WizardNavItem } from '@patternfly/react-core/dist/esm/components/Wizard/index.js'; <WizardNavItem />`,
      output: `import { WizardNavItem } from '@patternfly/react-core/dist/esm/components/Wizard/index.js'; <WizardNavItem />`,
      errors: [
        {
          message: `There is now a wrapper element with class \`pf-v6-c-wizard__nav-link-main\` rendered around the nav item content.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { WizardNavItem } from '@patternfly/react-core/dist/js/components/Wizard/index.js'; <WizardNavItem />`,
      output: `import { WizardNavItem } from '@patternfly/react-core/dist/js/components/Wizard/index.js'; <WizardNavItem />`,
      errors: [
        {
          message: `There is now a wrapper element with class \`pf-v6-c-wizard__nav-link-main\` rendered around the nav item content.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { WizardNavItem } from '@patternfly/react-core/dist/dynamic/components/Wizard/index.js'; <WizardNavItem />`,
      output: `import { WizardNavItem } from '@patternfly/react-core/dist/dynamic/components/Wizard/index.js'; <WizardNavItem />`,
      errors: [
        {
          message: `There is now a wrapper element with class \`pf-v6-c-wizard__nav-link-main\` rendered around the nav item content.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
