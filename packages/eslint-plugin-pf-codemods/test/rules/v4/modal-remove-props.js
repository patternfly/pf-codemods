const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v4/modal-remove-props');

ruleTester.run("modal-remove-props", rule, {
  valid: [
    {
      code: `import { Modal } from '@patternfly/react-core'; <Modal />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Modal isFooterLeftAligned hideTitle />`,
    }
  ],
  invalid: [
    {
      code:   `import { Modal } from '@patternfly/react-core'; <Modal isFooterLeftAligned />`,
      output: `import { Modal } from '@patternfly/react-core'; <Modal  />`,
      errors: [{
        message: `isFooterLeftAligned prop for Modal has been removed`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { Modal } from '@patternfly/react-core'; <Modal hideTitle />`,
      output: `import { Modal } from '@patternfly/react-core'; <Modal  />`,
      errors: [{
        message: `hideTitle prop for Modal has been removed`,
        type: "JSXOpeningElement",
      }]
    },
  ]
});
