const ruleTester = require('../ruletester');
const rule = require('../../lib/rules/modal-variant');

ruleTester.run("modal-variant", rule, {
  valid: [
    {
      code: `import { Modal } from '@patternfly/react-core'; <Modal variant="small" />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Modal isSmall />`,
    }
  ],
  invalid: [
    {
      code:   `import { Modal } from '@patternfly/react-core'; <Modal isLarge />`,
      output: `import { Modal } from '@patternfly/react-core'; <Modal variant="large" />`,
      errors: [{
        message: `Modal has replaced isLarge prop with variant="large"`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { Modal } from '@patternfly/react-core'; <Modal isSmall />`,
      output: `import { Modal } from '@patternfly/react-core'; <Modal variant="small" />`,
      errors: [{
        message: `Modal has replaced isSmall prop with variant="small"`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
