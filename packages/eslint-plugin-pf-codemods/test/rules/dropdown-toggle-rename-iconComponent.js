const ruleTester = require('./ruletester');
const rule = require('../../lib/rules/dropdown-toggle-rename-iconComponent');

ruleTester.run("dropdown-toggle-rename-iconComponent", rule, {
  valid: [
    {
      code: `import { DropdownToggle } from '@patternfly/react-core'; <DropdownToggle toggleIndicator={CaretDownIcon} />`,
    }
  ],
  invalid: [
    {
      code:   `import { DropdownToggle } from '@patternfly/react-core'; <DropdownToggle iconComponent={CaretDownIcon} />`,
      output: `import { DropdownToggle } from '@patternfly/react-core'; <DropdownToggle toggleIndicator={CaretDownIcon} />`,
      errors: [{
        message: `iconComponent prop has been removed for DropdownToggle in favor of toggleIndicator.`,
        type: "JSXOpeningElement",
      }]
    },
  ]
});
