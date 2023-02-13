const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/table-warn-actionsColumn');

ruleTester.run("table-warn-actionsColumn", rule, {
  valid: [
    {
      code: `<Table />`,
    },
    {
      code: `<TableComposable />`,
    }
  ],
  invalid: [
    {
      code:   `import { Table } from '@patternfly/react-table';`,
      output: `import { Table } from '@patternfly/react-table';`,
      errors: [{
        message: `The ActionsColumn now uses the new version of Dropdown. The action toggle should now pass a MenuToggle rather than a DropdownToggle, and direction and position properties are now passed under the new popperProps property.`,
        type: "ImportDeclaration",
      }]
    },
    {
      code:   `import { TableComposable } from '@patternfly/react-table';`,
      output: `import { TableComposable } from '@patternfly/react-table';`,
      errors: [{
        message: `The ActionsColumn now uses the new version of Dropdown. The action toggle should now pass a MenuToggle rather than a DropdownToggle, and direction and position properties are now passed under the new popperProps property.`,
        type: "ImportDeclaration",
      }]
    },
  ]
});
