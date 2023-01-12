const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/remove-removeFindDomNode');

ruleTester.run("remove-removeFindDomNode", rule, {
  valid: [
    {
      code: `import { ApplicationLauncher } from '@patternfly/react-core'; <ApplicationLauncher />`,
    },
    {
      // No @patternfly/react-core import
      code: `<ApplicationLauncher removeFindDomNode />`,
    },
    {
      code: `import { ClipboardCopy } from '@patternfly/react-core'; <ClipboardCopy />`,
    },
    {
      // No @patternfly/react-core import
      code: `<ClipboardCopy removeFindDomNode />`,
    },
    {
      code: `import { ContextSelector } from '@patternfly/react-core'; <ContextSelector />`,
    },
    {
      // No @patternfly/react-core import
      code: `<ContextSelector removeFindDomNode />`,
    },
    {
      code: `import { Dropdown } from '@patternfly/react-core'; <Dropdown />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Dropdown removeFindDomNode />`,
    },
    {
      code: `import { NavItem } from '@patternfly/react-core'; <NavItem />`,
    },
    {
      // No @patternfly/react-core import
      code: `<NavItem removeFindDomNode />`,
    },
    {
      code: `import { OptionsMenu } from '@patternfly/react-core'; <OptionsMenu />`,
    },
    {
      // No @patternfly/react-core import
      code: `<OptionsMenu removeFindDomNode />`,
    },
    {
      code: `import { Popover } from '@patternfly/react-core'; <Popover />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Popover removeFindDomNode />`,
    },
    {
      code: `import { SearchInput } from '@patternfly/react-core'; <SearchInput />`,
    },
    {
      // No @patternfly/react-core import
      code: `<SearchInput removeFindDomNode />`,
    },
    {
      code: `import { Select } from '@patternfly/react-core'; <Select />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Select removeFindDomNode />`,
    },
    {
      code: `import { OverflowTab } from '@patternfly/react-core'; <OverflowTab />`,
    },
    {
      // No @patternfly/react-core import
      code: `<OverflowTab removeFindDomNode />`,
    },
    {
      code: `import { Timepicker } from '@patternfly/react-core'; <Timepicker />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Timepicker removeFindDomNode />`,
    },
    {
      code: `import { Tooltip } from '@patternfly/react-core'; <Tooltip />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Tooltip removeFindDomNode />`,
    },
    {
      code: `import { Truncate } from '@patternfly/react-core'; <Truncate />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Truncate removeFindDomNode />`,
    }
  ],
  invalid: [
    {
      code:   `import { ApplicationLauncher } from '@patternfly/react-core'; <ApplicationLauncher removeFindDomNode />`,
      output: `import { ApplicationLauncher } from '@patternfly/react-core'; <ApplicationLauncher  />`,
      errors: [{
        message: `removeFindDomNode prop for ApplicationLauncher has been removed`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { ClipboardCopy } from '@patternfly/react-core'; <ClipboardCopy removeFindDomNode />`,
      output: `import { ClipboardCopy } from '@patternfly/react-core'; <ClipboardCopy  />`,
      errors: [{
        message: `removeFindDomNode prop for ClipboardCopy has been removed`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { ContextSelector } from '@patternfly/react-core'; <ContextSelector removeFindDomNode />`,
      output: `import { ContextSelector } from '@patternfly/react-core'; <ContextSelector  />`,
      errors: [{
        message: `removeFindDomNode prop for ContextSelector has been removed`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { Dropdown } from '@patternfly/react-core'; <Dropdown removeFindDomNode />`,
      output: `import { Dropdown } from '@patternfly/react-core'; <Dropdown  />`,
      errors: [{
        message: `removeFindDomNode prop for Dropdown has been removed`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { NavItem } from '@patternfly/react-core'; <NavItem removeFindDomNode />`,
      output: `import { NavItem } from '@patternfly/react-core'; <NavItem  />`,
      errors: [{
        message: `removeFindDomNode prop for NavItem has been removed`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { OptionsMenu } from '@patternfly/react-core'; <OptionsMenu removeFindDomNode />`,
      output: `import { OptionsMenu } from '@patternfly/react-core'; <OptionsMenu  />`,
      errors: [{
        message: `removeFindDomNode prop for OptionsMenu has been removed`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { Popover } from '@patternfly/react-core'; <Popover removeFindDomNode />`,
      output: `import { Popover } from '@patternfly/react-core'; <Popover  />`,
      errors: [{
        message: `removeFindDomNode prop for Popover has been removed`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { SearchInput } from '@patternfly/react-core'; <SearchInput removeFindDomNode />`,
      output: `import { SearchInput } from '@patternfly/react-core'; <SearchInput  />`,
      errors: [{
        message: `removeFindDomNode prop for SearchInput has been removed`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { Select } from '@patternfly/react-core'; <Select removeFindDomNode />`,
      output: `import { Select } from '@patternfly/react-core'; <Select  />`,
      errors: [{
        message: `removeFindDomNode prop for Select has been removed`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { OverflowTab } from '@patternfly/react-core'; <OverflowTab removeFindDomNode />`,
      output: `import { OverflowTab } from '@patternfly/react-core'; <OverflowTab  />`,
      errors: [{
        message: `removeFindDomNode prop for OverflowTab has been removed`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { Timepicker } from '@patternfly/react-core'; <Timepicker removeFindDomNode />`,
      output: `import { Timepicker } from '@patternfly/react-core'; <Timepicker  />`,
      errors: [{
        message: `removeFindDomNode prop for Timepicker has been removed`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { Tooltip } from '@patternfly/react-core'; <Tooltip removeFindDomNode />`,
      output: `import { Tooltip } from '@patternfly/react-core'; <Tooltip  />`,
      errors: [{
        message: `removeFindDomNode prop for Tooltip has been removed`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { Truncate } from '@patternfly/react-core'; <Truncate removeFindDomNode />`,
      output: `import { Truncate } from '@patternfly/react-core'; <Truncate  />`,
      errors: [{
        message: `removeFindDomNode prop for Truncate has been removed`,
        type: "JSXOpeningElement",
      }]
    },
  ]
});
