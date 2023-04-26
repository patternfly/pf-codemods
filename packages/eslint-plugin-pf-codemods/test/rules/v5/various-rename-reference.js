const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/various-rename-reference');

ruleTester.run("various-rename-reference", rule, {
  valid: [
    {
      code: `import { Tooltip, Popover } from '@patternfly/react-core'; <><Tooltip triggerRef /><Popover triggerRef /></>`,
    },
    {
      code: `import { Tooltip } from '@patternfly/react-core/dist/esm/components/Tooltip/index.js'; import { Popover } from '@patternfly/react-core/dist/esm/components/Popover/index.js'; <><Tooltip triggerRef /><Popover triggerRef /></>`,
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
    }),
    {
      code: `import { Tooltip } from '@patternfly/react-core/dist/esm/components/Tooltip/index.js'; import { Popover } from '@patternfly/react-core/dist/esm/components/Popover/index.js'; <><Tooltip reference /><Popover reference /></>`,
      output: `import { Tooltip } from '@patternfly/react-core/dist/esm/components/Tooltip/index.js'; import { Popover } from '@patternfly/react-core/dist/esm/components/Popover/index.js'; <><Tooltip triggerRef /><Popover triggerRef /></>`,
      errors: [
        {
          message: `reference prop for Tooltip has been renamed to triggerRef`,
          type: "JSXOpeningElement",
        },
        {
          message: `reference prop for Popover has been renamed to triggerRef`,
          type: "JSXOpeningElement",
        },
      ]
    }
  ]
});
