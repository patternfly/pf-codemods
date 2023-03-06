const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/clipboardCopy-warn-onChange-event-added');

ruleTester.run("clipboardCopy-warn-onChange-event-added", rule, {
  valid: [
    {
      code: "import { ClipboardCopy } from '@patternfly/react-core'; <ClipboardCopy />"
    },
    {
      // No @patternfly/react-core import
      code: `<ClipboardCopy />`,
    }
  ],
  invalid: [
    {
      code:   `import { ClipboardCopy } from '@patternfly/react-core'; <ClipboardCopy onChange={handleChange} />`,
      output: `import { ClipboardCopy } from '@patternfly/react-core'; <ClipboardCopy onChange={handleChange} />`,
      errors: [{
        message: `The "onChange" prop for ClipboardCopy has been updated to include the event as its first parameter. "onChange" handlers may require an update.`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
