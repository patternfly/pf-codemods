const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/clipboardCopy-remove-popoverPosition");

ruleTester.run("clipboardCopy-remove-popoverPosition", rule, {
  valid: [
    {
      code: `import { ClipboardCopy } from '@patternfly/react-core'; <ClipboardCopy position={TooltipPosition.top} />`,
    },
    {
      code: `import { ClipboardCopyButton } from '@patternfly/react-core'; <ClipboardCopyButton position={TooltipPosition.top} />`,
    },
    {
      // No @patternfly/react-core import
      code: `<ClipboardCopy position={PopoverPosition.top} />`,
    },
    {
      // No @patternfly/react-core import
      code: `<ClipboardCopyButton position={PopoverPosition.top} />`,
    },
  ],
  invalid: [
    {
      code: `import { ClipboardCopy } from '@patternfly/react-core'; <ClipboardCopy position={PopoverPosition.top} />`,
      output: `import { ClipboardCopy } from '@patternfly/react-core'; <ClipboardCopy position="top" />`,
      errors: [
        {
          message: `PopoverPosition type has been removed for the position prop on ClipboardCopy.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { ClipboardCopyButton } from '@patternfly/react-core'; <ClipboardCopyButton position={PopoverPosition.top} />`,
      output: `import { ClipboardCopyButton } from '@patternfly/react-core'; <ClipboardCopyButton position="top" />`,
      errors: [
        {
          message: `PopoverPosition type has been removed for the position prop on ClipboardCopyButton.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
