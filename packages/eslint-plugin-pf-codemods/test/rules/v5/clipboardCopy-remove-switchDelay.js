const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/clipboardCopy-remove-switchDelay');

ruleTester.run("clipboardCopy-remove-switchDelay", rule, {
  valid: [
    {
      code: `import { ClipboardCopy } from '@patternfly/react-core'; <ClipboardCopy />`,
    },
    {
      code: `import { ClipboardCopy } from '@patternfly/react-core/dist/esm/components/Clipboard/index.js'; <ClipboardCopy />`,
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
        message: `switchDelay prop for ClipboardCopy has been removed`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { ClipboardCopy } from '@patternfly/react-core/dist/esm/components/Clipboard/index.js'; <ClipboardCopy switchDelay />`,
      output: `import { ClipboardCopy } from '@patternfly/react-core/dist/esm/components/Clipboard/index.js'; <ClipboardCopy  />`,
      errors: [{
        message: `switchDelay prop for ClipboardCopy has been removed`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
