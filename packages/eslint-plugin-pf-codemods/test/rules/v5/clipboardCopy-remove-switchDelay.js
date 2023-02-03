const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/clipboardCopy-remove-switchDelay');

ruleTester.run("clipboardCopy-remove-switchDelay", rule, {
  valid: [
    {
      code: `import { ClipboardCopy } from '@patternfly/react-core'; <ClipboardCopy />`,
    },
    {
      // No @patternfly/react-core import
      code: `<ClipboardCopy switchDelay />`,
    }
  ],
  invalid: [
    {
      code:   `import { ClipboardCopy } from '@patternfly/react-core'; <ClipboardCopy switchDelay />`,
      output: `import { ClipboardCopy } from '@patternfly/react-core'; <ClipboardCopy  />`,
      errors: [{
        message: `switchDelay prop has been removed for ClipboardCopy`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
