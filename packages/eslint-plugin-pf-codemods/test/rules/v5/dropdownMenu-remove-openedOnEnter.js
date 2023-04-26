const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/dropdownMenu-remove-openedOnEnter');

ruleTester.run("dropdownMenu-remove-openedOnEnter", rule, {
  valid: [
    {
      code: `import { DropdownMenu } from '@patternfly/react-core'; <DropdownMenu />`,
    },
    {
      code: `import { DropdownMenu } from '@patternfly/react-core/dist/esm/components/Dropdown/index.js'; <DropdownMenu />`,
    },
    {
      // No @patternfly/react-core import
      code: `<DropdownMenu openedOnEnter />`,
    }
  ],
  invalid: [
    {
      code:   `import { DropdownMenu } from '@patternfly/react-core/dist/esm/components/Dropdown/index.js'; <DropdownMenu openedOnEnter={false} />`,
      output: `import { DropdownMenu } from '@patternfly/react-core/dist/esm/components/Dropdown/index.js'; <DropdownMenu  />`,
      errors: [{
        message: `openedOnEnter prop for DropdownMenu has been removed.`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { DropdownMenu } from '@patternfly/react-core'; <DropdownMenu openedOnEnter={false} />`,
      output: `import { DropdownMenu } from '@patternfly/react-core'; <DropdownMenu  />`,
      errors: [{
        message: `openedOnEnter prop for DropdownMenu has been removed.`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
