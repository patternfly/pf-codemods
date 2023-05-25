const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/selectDropdown-rename-itemId");

ruleTester.run("selectDropdown-rename-itemId", rule, {
  valid: [
    {
      code: `import { SelectOption } from '@patternfly/react-core'; <SelectOption />`,
    },
    {
      code: `import { SelectOption } from '@patternfly/react-core'; <SelectOption value />`,
    },
    {
      code: `import { DropdownItem } from '@patternfly/react-core'; <DropdownItem />`,
    },
    {
      code: `import { DropdownItem } from '@patternfly/react-core'; <DropdownItem value />`,
    },
    {
      // No @patternfly/react-core import
      code: `<SelectOption itemId />`,
    },
    {
      // No @patternfly/react-core import
      code: `<DropdownItem itemId />`,
    },
  ],
  invalid: [
    {
      code: `import { SelectOption } from '@patternfly/react-core'; <SelectOption itemId="test" />`,
      output: `import { SelectOption } from '@patternfly/react-core'; <SelectOption value="test" />`,
      errors: [
        {
          message: `itemId prop for SelectOption has been renamed to value`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { DropdownItem } from '@patternfly/react-core'; <DropdownItem itemId="test" />`,
      output: `import { DropdownItem } from '@patternfly/react-core'; <DropdownItem value="test" />`,
      errors: [
        {
          message: `itemId prop for DropdownItem has been renamed to value`,
          type: "JSXOpeningElement",
        },
      ],
    },
    // Import from dist
    {
      code: `import { SelectOption } from '@patternfly/react-core/dist/esm/components/Select/index.js'; <SelectOption itemId="test" />`,
      output: `import { SelectOption } from '@patternfly/react-core/dist/esm/components/Select/index.js'; <SelectOption value="test" />`,
      errors: [
        {
          message: `itemId prop for SelectOption has been renamed to value`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { DropdownItem } from '@patternfly/react-core/dist/esm/components/Dropdown/index.js'; <DropdownItem itemId="test" />`,
      output: `import { DropdownItem } from '@patternfly/react-core/dist/esm/components/Dropdown/index.js'; <DropdownItem value="test" />`,
      errors: [
        {
          message: `itemId prop for DropdownItem has been renamed to value`,
          type: "JSXOpeningElement",
        },
      ],
    },
    // Aliased import
    {
      code: `import { SelectOption as PFSO } from '@patternfly/react-core'; <PFSO itemId="test" />`,
      output: `import { SelectOption as PFSO } from '@patternfly/react-core'; <PFSO value="test" />`,
      errors: [
        {
          message: `itemId prop for PFSO has been renamed to value`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { DropdownItem as PFDI } from '@patternfly/react-core'; <PFDI itemId="test" />`,
      output: `import { DropdownItem as PFDI } from '@patternfly/react-core'; <PFDI value="test" />`,
      errors: [
        {
          message: `itemId prop for PFDI has been renamed to value`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
