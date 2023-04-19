const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/dropdownToggle-remove-isPrimary');

ruleTester.run("dropdownToggle-remove-isPrimary", rule, {
  valid: [
    {
      code: `import { DropdownToggle } from '@patternfly/react-core/dist/esm/components/Dropdown/index.js'; <DropdownToggle toggleVariant="primary" />`,
    },
    {
      code: `import { DropdownToggle } from '@patternfly/react-core/dist/esm/components/Dropdown/index.js'; <DropdownToggle toggleVariant="primary" />`,
    },
    {
      // No @patternfly/react-core import
      code: `<DropdownToggle isPrimary />`,
    }
  ],
  invalid: [
    {
      code:   `import { DropdownToggle } from '@patternfly/react-core/dist/esm/components/Dropdown/index.js'; <DropdownToggle isPrimary />`,
      output: `import { DropdownToggle } from '@patternfly/react-core/dist/esm/components/Dropdown/index.js'; <DropdownToggle toggleVariant="primary" />`,
      errors: [{
        message: `isPrimary prop has been removed for DropdownToggle and replaced by using 'primary' value on the toggleVariant prop.`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { DropdownToggle } from '@patternfly/react-core'; <DropdownToggle isPrimary />`,
      output: `import { DropdownToggle } from '@patternfly/react-core'; <DropdownToggle toggleVariant="primary" />`,
      errors: [{
        message: `isPrimary prop has been removed for DropdownToggle and replaced by using 'primary' value on the toggleVariant prop.`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
