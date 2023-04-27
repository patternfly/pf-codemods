const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/toolbar-remove-visiblity');

ruleTester.run("toolbar-remove-visiblity", rule, {
  valid: [
    {
      code: `import { ToolbarContent } from '@patternfly/react-core'; <ToolbarContent visibility />`,
    },
    {
      code: `import { ToolbarContent } from '@patternfly/react-core/dist/esm/components/ToolbarContent/index.js'; <ToolbarContent visibility />`,
    },
    {
      // No @patternfly/react-core import
      code: `<ToolbarContent visiblity />`,
    }
  ],
  invalid: [
    {
      code:   `import { ToolbarContent } from '@patternfly/react-core'; <ToolbarContent visiblity={{ default: 'hidden'}} />`,
      output: `import { ToolbarContent } from '@patternfly/react-core'; <ToolbarContent visibility={{ default: 'hidden'}} />`,
      errors: [{
        message: `visiblity prop for ToolbarContent has been renamed to visibility`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { ToolbarContent } from '@patternfly/react-core/dist/esm/components/ToolbarContent/index.js'; <ToolbarContent visiblity={{ default: 'hidden'}} />`,
      output: `import { ToolbarContent } from '@patternfly/react-core/dist/esm/components/ToolbarContent/index.js'; <ToolbarContent visibility={{ default: 'hidden'}} />`,
      errors: [{
        message: `visiblity prop for ToolbarContent has been renamed to visibility`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
