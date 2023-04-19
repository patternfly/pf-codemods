const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/label-warn-truncated-default");

ruleTester.run("label-warn-truncated-default", rule, {
  valid: [
    {
      // isTruncated exists - this will be picked up by the label-remove-isTruncated test
      code: `import { Label } from '@patternfly/react-core'; <Label isTruncated />`,
    },
    {
      // isTruncated exists - this will be picked up by the label-remove-isTruncated test
      code: `import { Label } from '@patternfly/react-core/dist/esm/components/Label/index.js'; <Label isTruncated />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Label />`,
    }
  ],
  invalid: [
    {
      code:   `import { Label } from '@patternfly/react-core'; <Label />`,
      output: `import { Label } from '@patternfly/react-core'; <Label />`,
      errors: [{
        message: 'The Label component is now truncated by default. There is also a new property (textMaxWidth) to customize when truncation occurs. The DOM will be a little different and may require changes in your tests.',
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { Label } from '@patternfly/react-core/dist/esm/components/Label/index.js'; <Label />`,
      output: `import { Label } from '@patternfly/react-core/dist/esm/components/Label/index.js'; <Label />`,
      errors: [{
        message: 'The Label component is now truncated by default. There is also a new property (textMaxWidth) to customize when truncation occurs. The DOM will be a little different and may require changes in your tests.',
        type: "JSXOpeningElement",
      }]
    }
  ]
});
