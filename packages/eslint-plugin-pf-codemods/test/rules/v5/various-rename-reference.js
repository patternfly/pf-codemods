const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/various-rename-reference');

ruleTester.run("various-rename-reference", rule, {
  valid: [
    {
      code: `import { Tooltip, Popover } from '@patternfly/react-core'; <><Tooltip triggerRef /><Popover triggerRef /></>`,
    },
    {
      // No @patternfly/react-core import
      code: `<><Tooltip reference /><Popover reference /></>`,
    }
  ],
  invalid: [
    ...['Tooltip', 'Popover'].map( c => {
      return {
        code:   `import { ${c} } from '@patternfly/react-core'; <${c} reference />`,
        output: `import { ${c} } from '@patternfly/react-core'; <${c} triggerRef />`,
        errors: [{
          message: `reference prop for ${c} has been renamed to triggerRef`,
          type: "JSXOpeningElement",
        }]
      };
    })
  ]
});
