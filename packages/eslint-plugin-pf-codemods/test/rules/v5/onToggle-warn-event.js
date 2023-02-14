const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/onToggle-warn-event');

ruleTester.run("onToggle-warn-event", rule, {
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
    },
    {
      code: `import { ApplicationLauncher } from '@foo/bar'; <ApplicationLauncher />`,
    },
    {
      code: `import { BadgeToggle } from '@foo/bar'; <BadgeToggle />`,
    },
    {
      code: `import { DropdownToggle } from '@foo/bar'; <DropdownToggle />`,
    },
    {
      code: `import { KebabToggle } from '@foo/bar'; <KebabToggle />`,
    },
    {
      code: `import { Toggle } from '@foo/bar'; <Toggle />`,
    },
    {
      code: `import { Select } from '@foo/bar'; <Select />`,
    },
    {
      code: `import { SelectToggle } from '@foo/bar'; <SelectToggle />`,
    }
  ],
  invalid: [
    {
      code:   `import { ApplicationLauncher } from '@patternfly/react-core'; <ApplicationLauncher />;`,
      output: `import { ApplicationLauncher } from '@patternfly/react-core'; <ApplicationLauncher />;`,
      errors: [{
        message: `ApplicationLauncher onToggle prop has been updated to include the event parameter as its first parameter. onToggle handlers may require an update.`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { BadgeToggle } from '@patternfly/react-core'; <BadgeToggle />;`,
      output: `import { BadgeToggle } from '@patternfly/react-core'; <BadgeToggle />;`,
      errors: [{
        message: `BadgeToggle onToggle prop has been updated to include the event parameter as its first parameter. onToggle handlers may require an update.`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { DropdownToggle } from '@patternfly/react-core'; <DropdownToggle />;`,
      output: `import { DropdownToggle } from '@patternfly/react-core'; <DropdownToggle />;`,
      errors: [{
        message: `DropdownToggle onToggle prop has been updated to include the event parameter as its first parameter. onToggle handlers may require an update.`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { KebabToggle } from '@patternfly/react-core'; <KebabToggle />;`,
      output: `import { KebabToggle } from '@patternfly/react-core'; <KebabToggle />;`,
      errors: [{
        message: `KebabToggle onToggle prop has been updated to include the event parameter as its first parameter. onToggle handlers may require an update.`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { Toggle } from '@patternfly/react-core'; <Toggle />;`,
      output: `import { Toggle } from '@patternfly/react-core'; <Toggle />;`,
      errors: [{
        message: `Toggle onToggle prop has been updated to include the event parameter as its first parameter. onToggle handlers may require an update.`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { Select } from '@patternfly/react-core'; <Select />;`,
      output: `import { Select } from '@patternfly/react-core'; <Select />;`,
      errors: [{
        message: `Select onToggle prop has been updated to include the event parameter as its first parameter. onToggle handlers may require an update.`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { SelectToggle } from '@patternfly/react-core'; <SelectToggle />;`,
      output: `import { SelectToggle } from '@patternfly/react-core'; <SelectToggle />;`,
      errors: [{
        message: `SelectToggle onToggle prop has been updated to include the event parameter as its first parameter. onToggle handlers may require an update.`,
        type: "JSXOpeningElement",
      }]
    },
  ]
});
