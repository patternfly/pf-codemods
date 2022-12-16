const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/toolbar-remove-visiblity');

ruleTester.run("toolbar-remove-visiblity", rule, {
  valid: [
    {
      code: `import { ToolbarContent } from '@patternfly/react-core'; <ToolbarContent visibility />`,
    },
    {
      // No @patternfly/react-core import
      code: `<ToolbarContent visibility />`,
    }
  ],
  invalid: [
    {
      code:   `import { ToolbarContent } from '@patternfly/react-core'; <ToolbarContent visiblity={{ default: 'hidden'}} />`,
      output: `import { ToolbarContent } from '@patternfly/react-core'; <ToolbarContent visibility={{ default: 'hidden'}} />`,
      errors: [{
        message: `visiblity prop for ToolbarContent has been removed and replaced with the visibility prop.`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
