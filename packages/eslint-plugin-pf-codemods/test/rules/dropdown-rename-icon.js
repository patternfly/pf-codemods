const ruleTester = require('./ruletester');
const rule = require('../../lib/rules/dropdown-rename-icon');

ruleTester.run("dropdown-rename-icon", rule, {
  valid: [
    {
      code: `import { DropdownItem, DropdownItemIcon } from '@patternfly/react-core';
<DropdownItem icon={<CogIcon />} key="action" component="button" />`
    }
  ],
  invalid: [
    {
      code:   `import { DropdownItem, DropdownItemIcon } from '@patternfly/react-core';
<DropdownItem key="action" component="button" variant="icon">
  <DropdownItemIcon>
    <CogIcon />
  </DropdownItemIcon>
</DropdownItem>`,
      output: `import { DropdownItem, DropdownItemIcon } from '@patternfly/react-core';
<DropdownItem icon={<CogIcon />} key="action" component="button" >
  
</DropdownItem>`,
      errors: [{
        message: `variant="icon" has been removed from DropdownItem, use icon={<CogIcon />} instead`,
        type: "JSXElement",
      }]
    },
    {
      // We can't narrow down to a single DropdownItemIcon, so just remove variant="icon"
      code:   `import { DropdownItem, DropdownItemIcon } from '@patternfly/react-core';
<DropdownItem key="action" component="button" variant="icon">
  <DropdownItemIcon>
    <CogIcon />
  </DropdownItemIcon>
  <DropdownItemIcon />
</DropdownItem>`,
      output: `import { DropdownItem, DropdownItemIcon } from '@patternfly/react-core';
<DropdownItem key="action" component="button" >
  <DropdownItemIcon>
    <CogIcon />
  </DropdownItemIcon>
  <DropdownItemIcon />
</DropdownItem>`,
      errors: [{
        message: `variant="icon" has been removed from DropdownItem, use icon={<Icon />} instead`,
        type: "JSXElement",
      }]
    },
  ]
});
