const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/tableComposable-remove-hasSelectableRowCaption');

ruleTester.run("tableComposable-remove-hasSelectableRowCaption", rule, {
  valid: [
    {
      code: `import { TableComposable } from '@patternfly/react-table'; <TableComposable />`,
    },
    {
      code: `import { TableComposable } from '@patternfly/react-table/dist/esm/components/TableComposable/index.js'; <TableComposable />`,
    },
    {
      // No @patternfly/react-core import
      code: `<TableComposable hasSelectableRowCaption />`,
    }
  ],
  invalid: [
    {
      code:   `import { TableComposable } from '@patternfly/react-table'; <TableComposable hasSelectableRowCaption />`,
      output: `import { TableComposable } from '@patternfly/react-table'; <TableComposable  />`,
      errors: [{
        message: `hasSelectableRowCaption prop for TableComposable has been removed`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { TableComposable } from '@patternfly/react-table/dist/esm/components/TableComposable/index.js'; <TableComposable hasSelectableRowCaption />`,
      output: `import { TableComposable } from '@patternfly/react-table/dist/esm/components/TableComposable/index.js'; <TableComposable  />`,
      errors: [{
        message: `hasSelectableRowCaption prop for TableComposable has been removed`,
        type: "JSXOpeningElement",
      }]
    },
  ]
});