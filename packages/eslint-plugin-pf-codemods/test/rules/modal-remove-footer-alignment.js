const ruleTester = require('./ruletester');
const rule = require('../../lib/rules/modal-remove-footer-alignment');

ruleTester.run("modal-remove-footer-alignment", rule, {
  valid: [
    {
      code: `import { Modal } from '@patternfly/react-core'; <Modal />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Modal isFooterLeftAligned />`,
    }
  ],
  invalid: [
    {
      code:   `import { Modal } from '@patternfly/react-core'; <Modal isFooterLeftAligned />`,
      output: `import { Modal } from '@patternfly/react-core'; <Modal  />`,
      errors: [{
        message: `isFooterLeftAligned prop has been removed for Modal. The footer is now always left-aligned`,
        type: "JSXOpeningElement",
      }]
    },
  ]
});
