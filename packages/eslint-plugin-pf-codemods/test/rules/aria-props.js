const ruleTester = require('../ruletester');
const rule = require('../../lib/rules/aria-props');

ruleTester.run("aria-props", rule, {
  valid: [
    {
      code: `import { AboutModalContainer } from '@patternfly/react-core'; <AboutModalContainer aboutModalBoxHeaderId="123" />`,
    },
    {
      // No @patternfly/react-core import
      code: `<AboutModalContainer ariaLabelledbyId="123" />`,
    }
  ],
  invalid: [
    {
      code:   `import { AboutModalContainer } from '@patternfly/react-core'; <AboutModalContainer ariaLabelledbyId="123" />`,
      output: `import { AboutModalContainer } from '@patternfly/react-core'; <AboutModalContainer aboutModalBoxHeaderId="123" />`,
      errors: [{
        message: `ariaLabelledbyId prop for AboutModalContainer has been renamed to aboutModalBoxHeaderId`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { WizardNav } from '@patternfly/react-core'; <WizardNav ariaLabel="123" />`,
      output: `import { WizardNav } from '@patternfly/react-core'; <WizardNav aria-label="123" />`,
      errors: [{
        message: `ariaLabel prop for WizardNav has been renamed to aria-label`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { LoginForm } from '@patternfly/react-core'; <LoginForm rememberMeAriaLabel="123" />`,
      output: `import { LoginForm } from '@patternfly/react-core'; <LoginForm  />`,
      errors: [{
        message: `rememberMeAriaLabel prop for LoginForm has been removed`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
