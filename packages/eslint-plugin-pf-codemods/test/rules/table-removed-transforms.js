const ruleTester = require('./ruletester');
const rule = require('../../lib/rules/table-removed-transforms');

ruleTester.run("table-removed-transforms", rule, {
  valid: [
    {
      code: `
        import { Table, TableHeader, TableBody, cellWidth } from '@patternfly/react-table';
        <Table rows={['Row 1']} cells={[{
          title: 'Last Commit',
          transforms: [cellWidth(100)]
        }]}>
          <TableHeader />
          <TableBody />
        </Table>
      `,
    }
  ],
  invalid: [
    {
      code: `import { Table, TableHeader, TableBody, cellWidth } from '@patternfly/react-table';
<Table rows={['Row 1']} cells={[{
  title: 'Last Commit',
  transforms: [cellWidth('max')]
}]}>
  <TableHeader />
  <TableBody />
</Table>`,
      output: `import { Table, TableHeader, TableBody, cellWidth } from '@patternfly/react-table';
<Table rows={['Row 1']} cells={[{
  title: 'Last Commit',
  transforms: [cellWidth(100)]
}]}>
  <TableHeader />
  <TableBody />
</Table>`,
      errors: [{
        message: `cellWidth('max') has been replaced with cellWidth(100)`,
        type: "CallExpression",
      }]
    },
  ]
});
