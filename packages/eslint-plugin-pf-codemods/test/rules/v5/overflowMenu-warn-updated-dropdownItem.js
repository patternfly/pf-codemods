const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/overflowMenu-warn-updated-dropdownItem");

ruleTester.run("overflowMenu-warn-updated-dropdownItem", rule, {
  valid: [
    {
      // No @patternfly/react-core import
      code: `<OverflowMenuDropdownItem />`,
    },
  ],
  invalid: [
    {
      code: `import { OverflowMenuDropdownItem } from '@patternfly/react-core'; <OverflowMenuDropdownItem />`,
      output: null,
      errors: [
        {
          message: `OverflowMenuDropdownItem now uses the Next implementation of DropdownItem and DropdownItemProps internally, and may require updating selectors for tests. Any other Dropdown componments used to build an OverflowMenu should also use the Next Dropdown components.`,
        },
      ],
    },
    {
      code: `import { OverflowMenuDropdownItem as OMDropdownItem } from '@patternfly/react-core'; <OMDropdownItem />`,
      output: null,
      errors: [
        {
          message: `OverflowMenuDropdownItem now uses the Next implementation of DropdownItem and DropdownItemProps internally, and may require updating selectors for tests. Any other Dropdown componments used to build an OverflowMenu should also use the Next Dropdown components.`,
        },
      ],
    },
    {
      code: `import { OverflowMenuDropdownItem as OMDropdownItem } from '@patternfly/react-core/dist/esm/components/Dropdown/index.js'; <OMDropdownItem />`,
      output: null,
      errors: [
        {
          message: `OverflowMenuDropdownItem now uses the Next implementation of DropdownItem and DropdownItemProps internally, and may require updating selectors for tests. Any other Dropdown componments used to build an OverflowMenu should also use the Next Dropdown components.`,
        },
      ],
    },
  ],
});
