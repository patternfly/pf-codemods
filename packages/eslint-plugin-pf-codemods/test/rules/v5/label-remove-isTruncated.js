const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/label-remove-isTruncated');

ruleTester.run("label-remove-isTruncated", rule, {
  valid: [
    {
      code: `import { Label } from '@patternfly/react-core'; <Label />`,
    },
    {
      code: `import { Label } from '@patternfly/react-core/dist/esm/components/Label/index.js'; <Label />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Label isTruncated />`,
    }
  ],
  invalid: [
    {
      code:   `import { Label } from '@patternfly/react-core'; <Label isTruncated />`,
      output: `import { Label } from '@patternfly/react-core'; <Label  />`,
      errors: [{
        message: `isTruncated prop has been removed for Label. This is now the default behavior. Note that there is also a new property (maxTextWidth) to customize when truncation will occur.`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { Label } from '@patternfly/react-core/dist/esm/components/Label/index.js'; <Label isTruncated />`,
      output: `import { Label } from '@patternfly/react-core/dist/esm/components/Label/index.js'; <Label  />`,
      errors: [{
        message: `isTruncated prop has been removed for Label. This is now the default behavior. Note that there is also a new property (maxTextWidth) to customize when truncation will occur.`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
