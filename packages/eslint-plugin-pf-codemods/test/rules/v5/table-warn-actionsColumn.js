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
      errors: [
        {
        message: `The ActionsColumn within Table now uses our new implementation of Dropdown. The action toggle should now pass a MenuToggle rather than the deprecated DropdownToggle, and direction and position properties are now passed under the ActionsColumn new popperProps property.`,
        type: "ImportDeclaration",
        },
      ]
    },
    {
      code:   `import { TableComposable, ActionsColumn } from '@patternfly/react-table';`,
      output: `import { TableComposable, ActionsColumn } from '@patternfly/react-table';`,
      errors: [{
        message: `The ActionsColumn within Table now uses our new implementation of Dropdown. The action toggle should now pass a MenuToggle rather than the deprecated DropdownToggle, and direction and position properties are now passed under the ActionsColumn new popperProps property.`,
        type: "ImportDeclaration",
        }]
    },
    {
      code:   `import { Table } from '@patternfly/react-table'; import { DropdownToggle as DropdownToggleDeprecated } from '@patternfly/react-core/deprecated';`,
      output: `import { Table } from '@patternfly/react-table'; import { DropdownToggle as DropdownToggleDeprecated } from '@patternfly/react-core/deprecated';`,
      errors: [
        {
        message: `The ActionsColumn within Table now uses our new implementation of Dropdown. The action toggle should now pass a MenuToggle rather than the deprecated DropdownToggle, and direction and position properties are now passed under the ActionsColumn new popperProps property.`,
        type: "ImportDeclaration",
        },
      ]
    },
    {
      code:   `import { Table as TableDeprecated } from '@patternfly/react-table/deprecated'; import { DropdownToggle as DropdownToggleDeprecated } from '@patternfly/react-core/deprecated';`,
      output: `import { Table as TableDeprecated } from '@patternfly/react-table/deprecated'; import { DropdownToggle as DropdownToggleDeprecated } from '@patternfly/react-core/deprecated';`,
      errors: [
        {
        message: `The ActionsColumn within Table now uses our new implementation of Dropdown. The action toggle should now pass a MenuToggle rather than the deprecated DropdownToggle, and direction and position properties are now passed under the ActionsColumn new popperProps property.`,
        type: "ImportDeclaration",
        },
      ]
    },
  ]
});
