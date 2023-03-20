const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/overflowMenuDropdownItem-renamed-prop");

ruleTester.run("overflowMenuDropdownItem-renamed-prop", rule, {
  valid: [
    {
      code: `import { OverflowMenuDropdownItem } from '@patternfly/react-core'; <OverflowMenuDropdownItem />`,
    },
    {
      // No @patternfly/react-core import
      code: `<OverflowMenuDropdownItem index={0} />`,
    },
  ],
  invalid: [
    {
      code: `import { OverflowMenuDropdownItem } from '@patternfly/react-core'; <OverflowMenuDropdownItem index={0} />`,
      output: `import { OverflowMenuDropdownItem } from '@patternfly/react-core'; <OverflowMenuDropdownItem itemId={0} />`,
      errors: [
        {
          message: `The "index" prop for OverflowMenuDropdownItem has been renamed to "itemId", and its type has been updated to either a number or string.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { OverflowMenuDropdownItem as OMDropdownItem } from '@patternfly/react-core'; <OMDropdownItem index={0} />`,
      output: `import { OverflowMenuDropdownItem as OMDropdownItem } from '@patternfly/react-core'; <OMDropdownItem itemId={0} />`,
      errors: [
        {
          message: `The "index" prop for OMDropdownItem has been renamed to "itemId", and its type has been updated to either a number or string.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
