const ruleTester = require('./ruletester');
const rule = require('../../lib/rules/wizard-remove-props');

ruleTester.run("wizard-remove-props", rule, {
  valid: [
    {
      code: `import { Wizard } from '@patternfly/react-core'; <Wizard  />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Wizard  />`,
    }
  ],
  invalid: [
    {
      code:   `import { Wizard } from '@patternfly/react-core'; <Wizard isCompactNav />`,
      output: `import { Wizard } from '@patternfly/react-core'; <Wizard  />`,
      errors: [{
        message: `isCompactNav prop for Wizard has been removed`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { Wizard } from '@patternfly/react-core'; <Wizard inPage />`,
      output: `import { Wizard } from '@patternfly/react-core'; <Wizard  />`,
      errors: [{
        message: `inPage prop for Wizard has been removed. 
        By default the Wizard will be displayed in page, filling its parent container. 
        If the consumer passes a managed isOpen flag, then the Wizard will be displayed in a modal.`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { Wizard } from '@patternfly/react-core'; <Wizard isFullHeight />`,
      output: `import { Wizard } from '@patternfly/react-core'; <Wizard  />`,
      errors: [{
        message: `isFullHeight prop for Wizard has been removed`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { Wizard } from '@patternfly/react-core'; <Wizard isFullWidth />`,
      output: `import { Wizard } from '@patternfly/react-core'; <Wizard  />`,
      errors: [{
        message: `isFullWidth prop for Wizard has been removed`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
