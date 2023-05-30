const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/table-rename-TableComposable");

ruleTester.run("table-rename-TableComposable", rule, {
  valid: [
    {
      code: `import { Table } from '@patternfly/react-table'; <Table data-codemods="true">Body</Table>`,
    },
    {
      code: `export { Table as CustomTable } from '@patternfly/react-table';`,
    },
    {
      // No @patternfly/react-core import
      code: `<Table data-codemods="true">Body</Table>`,
    },
  ],
  invalid: [
    {
      code: `import { TableComposable } from '@patternfly/react-table'; <TableComposable>Body</TableComposable>`,
      output: `import { Table /* data-codemods */ } from '@patternfly/react-table'; <Table>Body</Table>`,
      errors: [
        {
          message: "TableComposable has been replaced with Table",
          type: "ImportSpecifier",
        },
        {
          message: "TableComposable has been replaced with Table",
          type: "JSXIdentifier",
        },
        {
          message: "TableComposable has been replaced with Table",
          type: "JSXIdentifier",
        },
      ],
    },
    {
      code: `export { TableComposable as CustomTable } from '@patternfly/react-table';`,
      output: `export { Table as CustomTable /* data-codemods */ } from '@patternfly/react-table';`,
      errors: [
        {
          message: "TableComposable has been replaced with Table",
          type: "ExportNamedDeclaration",
        },
      ],
    },
  ],
});
