const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/dropdownItem-remove-isHovered');

ruleTester.run("dropdownItem-remove-isHovered", rule, {
  valid: [
    {
      code: `import { DropdownItem } from '@patternfly/react-core'; <DropdownItem />`,
    },
    {
      // No @patternfly/react-core import
      code: `<DropdownItem isHovered />`,
    }
  ],
  invalid: [
    {
      code:   `import { DropdownItem } from '@patternfly/react-core'; <DropdownItem isHovered />`,
      output: `import { DropdownItem } from '@patternfly/react-core'; <DropdownItem  />`,
      errors: [{
        message: `isHovered prop has been removed for DropdownItem.`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
