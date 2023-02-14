const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/toolbarVarious-remove-alignment');

ruleTester.run("toolbarVarious-remove-alignment", rule, {
  valid: [
    {
      code: `import { ToolbarContent, ToolbarGroup, ToolbarItem } from '@patternfly/react-core'; <><ToolbarContent /><ToolbarGroup align /><ToolbarItem align /></>`,
    },
    {
      // No @patternfly/react-core import
      code: `<><ToolbarContent alignment /><ToolbarGroup alignment /><ToolbarItem alignment /></>`,
    }
  ],
  invalid: [
    {
      code:   `import { ToolbarContent } from '@patternfly/react-core'; <ToolbarContent alignment={{ default: 'alignLeft' }} />`,
      output: `import { ToolbarContent } from '@patternfly/react-core'; <ToolbarContent  />`,
      errors: [{
        message: `alignment prop for ToolbarContent has been removed`,
        type: "JSXOpeningElement",
      }]
    },
    ...['ToolbarGroup', 'ToolbarItem'].map( c => {
      return {
        code:   `import { ${c} } from '@patternfly/react-core'; <${c} alignment={{ default: 'alignLeft' }} />`,
        output: `import { ${c} } from '@patternfly/react-core'; <${c} align={{ default: 'alignLeft' }} />`,
        errors: [{
          message: `alignment prop for ${c} has been renamed to align`,
          type: "JSXOpeningElement",
        }]
      };
    })
  ]
});
