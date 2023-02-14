const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/warn-event-api');

ruleTester.run("warn-event-api", rule, {
  valid: [
    {
      code: `<ApplicationLauncher />`,
    },
    {
      code: `<BadgeToggle />`,
    },
    {
      code: `<DropdownToggle />`,
    },
    {
      code: `<KebabToggle />`,
    },
    {
      code: `<Toggle />`,
    },
    {
      code: `<Select />`,
    },
    {
      code: `<SelectToggle />`,
    }
  ],
  invalid: [
    {
      code:   `import { ApplicationLauncher } from '@patternfly/react-core';`,
      output: `import { ApplicationLauncher } from '@patternfly/react-core';`,
      errors: [{
        message: `ApplicationLauncher onToggle prop has been updated to include the event parameter as its first parameter. onToggle handlers may require an update.`,
        type: "ImportDeclaration",
      }]
    },
    {
      code:   `import { BadgeToggle } from '@patternfly/react-core';`,
      output: `import { BadgeToggle } from '@patternfly/react-core';`,
      errors: [{
        message: `BadgeToggle onToggle prop has been updated to include the event parameter as its first parameter. onToggle handlers may require an update.`,
        type: "ImportDeclaration",
      }]
    },
    {
      code:   `import { DropdownToggle } from '@patternfly/react-core';`,
      output: `import { DropdownToggle } from '@patternfly/react-core';`,
      errors: [{
        message: `DropdownToggle onToggle prop has been updated to include the event parameter as its first parameter. onToggle handlers may require an update.`,
        type: "ImportDeclaration",
      }]
    },
    {
      code:   `import { KebabToggle } from '@patternfly/react-core';`,
      output: `import { KebabToggle } from '@patternfly/react-core';`,
      errors: [{
        message: `KebabToggle onToggle prop has been updated to include the event parameter as its first parameter. onToggle handlers may require an update.`,
        type: "ImportDeclaration",
      }]
    },
    {
      code:   `import { Toggle } from '@patternfly/react-core';`,
      output: `import { Toggle } from '@patternfly/react-core';`,
      errors: [{
        message: `Toggle onToggle prop has been updated to include the event parameter as its first parameter. onToggle handlers may require an update.`,
        type: "ImportDeclaration",
      }]
    },
    {
      code:   `import { Select } from '@patternfly/react-core';`,
      output: `import { Select } from '@patternfly/react-core';`,
      errors: [{
        message: `Select onToggle prop has been updated to include the event parameter as its first parameter. onToggle handlers may require an update.`,
        type: "ImportDeclaration",
      }]
    },
    {
      code:   `import { SelectToggle } from '@patternfly/react-core';`,
      output: `import { SelectToggle } from '@patternfly/react-core';`,
      errors: [{
        message: `SelectToggle onToggle prop has been updated to include the event parameter as its first parameter. onToggle handlers may require an update.`,
        type: "ImportDeclaration",
      }]
    },
  ]
});
