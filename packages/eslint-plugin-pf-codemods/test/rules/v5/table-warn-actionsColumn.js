const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/table-warn-actionsColumn');

ruleTester.run("table-warn-actionsColumn", rule, {
  valid: [
    {
      code: `import { Table } from '@patternfly/react-table'; <Table />`,
    },
    {
      code: `import { TableComposable } from '@patternfly/react-table'; <TableComposable />`,
    },
    {
      code: `<Table />`,
    },
    {
      code: `<TableComposable />`,
    }
  ],
  invalid: [
    {
      code:   `import { Table } from '@patternfly/react-table'; import { DropdownToggle } from '@patternfly/react-core';`,
      output: `import { Table } from '@patternfly/react-table'; import { DropdownToggle } from '@patternfly/react-core';`,
      errors: [{
        message: `The ActionsColumn now uses the Next version of Dropdown. The action toggle should now pass a MenuToggle rather than a DropdownToggle, and direction and position properties are now passed under the ActionsColumn new popperProps property.`,
        type: "Program",
      }]
    },
    {
      code:   `import { TableComposable, ActionsColumn } from '@patternfly/react-table';`,
      output: `import { TableComposable, ActionsColumn } from '@patternfly/react-table';`,
      errors: [{
        message: `The ActionsColumn now uses the Next version of Dropdown. The action toggle should now pass a MenuToggle rather than a DropdownToggle, and direction and position properties are now passed under the ActionsColumn new popperProps property.`,
        type: "Program",
      }]
    },
  ]
});
