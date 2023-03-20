const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/conditional-aria");

ruleTester.run("conditional-aria", rule, {
  valid: [
    {
      // No @patternfly/react-core import
      code: `<Wizard mainAriaLabel />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Wizard mainAriaLabelledBy />`,
    },
    {
      code: `import { MenuItem } from '@patternfly/react-core'; <MenuItem />`,
    },
    {
      // No @patternfly/react-core import
      code: `<MenuItem aria-label />`,
    },
    {
      code: `import { PageGroup } from '@patternfly/react-core'; <PageGroup />`,
    },
    {
      // No @patternfly/react-core import
      code: `<PageGroup aria-label />`,
    },
    {
      code: `import { PageNavigation } from '@patternfly/react-core'; <PageNavigation />`,
    },
    {
      // No @patternfly/react-core import
      code: `<PageNavigation aria-label />`,
    },
    {
      // No @patternfly/react-core import
      code: `<WizardBody aria-label />`,
    },
    {
      // No @patternfly/react-core import
      code: `<WizardBody aria-labelledby />`,
    },
  ],
  invalid: [
    {
      code: `import { ProgressStep } from '@patternfly/react-core'; <ProgressStep />`,
      output: `import { ProgressStep } from '@patternfly/react-core'; <ProgressStep />`,
      errors: [
        {
          message: `The internal "aria-labelledby" attribute for ProgressStep will now only be applied when the "popoverRender" prop is also passed.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Wizard } from '@patternfly/react-core'; <Wizard />`,
      output: `import { Wizard } from '@patternfly/react-core'; <Wizard />`,
      errors: [
        {
          message: `The Wizard's body will now be given a tabindex of "0" when the contents overflows.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Wizard } from '@patternfly/react-core'; <Wizard mainAriaLabel />`,
      output: `import { Wizard } from '@patternfly/react-core'; <Wizard mainAriaLabel />`,
      errors: [
        {
          message: `The "mainAriaLabel" prop will now only be applied when the Wizard's body contents overflows and causes a scrollbar. Additionally, the Wizard's body will now be given a tabindex of "0" when the contents overflows.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Wizard } from '@patternfly/react-core'; <Wizard mainAriaLabelledBy />`,
      output: `import { Wizard } from '@patternfly/react-core'; <Wizard mainAriaLabelledBy />`,
      errors: [
        {
          message: `The "mainAriaLabelledBy" prop will now only be applied when the Wizard's body contents overflows and causes a scrollbar. Additionally, the Wizard's body will now be given a tabindex of "0" when the contents overflows.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { WizardBody } from '@patternfly/react-core/next'; <WizardBody />`,
      output: `import { WizardBody } from '@patternfly/react-core/next'; <WizardBody />`,
      errors: [
        {
          message: `The WizardBody will now be given a tabindex of "0" when the contents overflows.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { WizardBody } from '@patternfly/react-core/next'; <WizardBody aria-label />`,
      output: `import { WizardBody } from '@patternfly/react-core/next'; <WizardBody aria-label />`,
      errors: [
        {
          message: `The "aria-label" prop will now only be applied when the WizardBody contents overflows and causes a scrollbar. Additionally, the WizardBody will now be given a tabindex of "0" when the contents overflows.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { WizardBody } from '@patternfly/react-core/next'; <WizardBody aria-labelledby />`,
      output: `import { WizardBody } from '@patternfly/react-core/next'; <WizardBody aria-labelledby />`,
      errors: [
        {
          message: `The "aria-labelledby" prop will now only be applied when the WizardBody contents overflows and causes a scrollbar. Additionally, the WizardBody will now be given a tabindex of "0" when the contents overflows.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { MenuItem } from '@patternfly/react-core'; <MenuItem aria-label />`,
      output: `import { MenuItem } from '@patternfly/react-core'; <MenuItem aria-label />`,
      errors: [
        {
          message: `If both the "aria-label" and "hasCheckbox" props are passed to MenuItem, the "aria-label" prop will now be applied to the internal <li> element. Otherwise "aria-label" will be applied to the element passed to the "component" prop.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { PageGroup } from '@patternfly/react-core'; <PageGroup aria-label />`,
      output: `import { PageGroup } from '@patternfly/react-core'; <PageGroup aria-label />`,
      errors: [
        {
          message: `The "aria-label" prop will now only be applied to PageGroup if the "hasOverflowScroll" prop is true.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { PageNavigation } from '@patternfly/react-core'; <PageNavigation aria-label />`,
      output: `import { PageNavigation } from '@patternfly/react-core'; <PageNavigation aria-label />`,
      errors: [
        {
          message: `The "aria-label" prop will now only be applied to PageNavigation if the "hasOverflowScroll" prop is true.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
