const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/hasCheck-prop-rename");

ruleTester.run("hasCheck-prop-rename", rule, {
  valid: [
    {
      code: `import { SelectOption } from '@patternfly/react-core'; <SelectOption hasCheck />`,
    },
    {
      // No @patternfly/react-core import
      code: `<SelectOption hasCheck />`,
    },
    {
      // No @patternfly/react-core import
      code: `<TreeView hasCheck />`,
    },
    {
      // No @patternfly/react-core import
      code: `<MenuItem hasCheck />`,
    },
  ],
  invalid: [
    {
      code: `import { SelectOption } from '@patternfly/react-core/next'; <SelectOption hasCheck />`,
      output: `import { SelectOption } from '@patternfly/react-core/next'; <SelectOption hasCheckbox />`,
      errors: [
        {
          message: `The 'hasCheck' prop for SelectOption has been renamed to 'hasCheckbox'.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { MenuItem } from '@patternfly/react-core'; <MenuItem hasCheck />`,
      output: `import { MenuItem } from '@patternfly/react-core'; <MenuItem hasCheckbox />`,
      errors: [
        {
          message: `The 'hasCheck' prop for MenuItem has been renamed to 'hasCheckbox'.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { TreeView } from '@patternfly/react-core'; <TreeView hasCheck />`,
      output: `import { TreeView } from '@patternfly/react-core'; <TreeView hasCheckbox />`,
      errors: [
        {
          message: `The 'hasCheck' prop for TreeView has been renamed to 'hasCheckbox'.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
