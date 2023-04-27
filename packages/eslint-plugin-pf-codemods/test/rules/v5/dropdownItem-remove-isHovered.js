const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/dropdownItem-remove-isHovered');

ruleTester.run("dropdownItem-remove-isHovered", rule, {
  valid: [
    {
      code: `import { DropdownItem } from '@patternfly/react-core'; <DropdownItem />`,
    },
    {
      code: `import { DropdownItem } from '@patternfly/react-core/dist/esm/components/Dropdown/index.js'; <DropdownItem />`,
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
        message: `isHovered prop for DropdownItem has been removed`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { DropdownItem } from '@patternfly/react-core/dist/esm/components/Dropdown/index.js'; <DropdownItem isHovered />`,
      output: `import { DropdownItem } from '@patternfly/react-core/dist/esm/components/Dropdown/index.js'; <DropdownItem  />`,
      errors: [{
        message: `isHovered prop for DropdownItem has been removed`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
