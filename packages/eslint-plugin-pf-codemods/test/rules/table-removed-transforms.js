const ruleTester = require('./ruletester');
const rule = require('../../lib/rules/table-removed-transforms');

ruleTester.run("table-removed-transforms", rule, {
  valid: [
    {
      code: `import { Table, cellWidth } from "@patternfly/react-table";
        <Table cells={[{ transforms: [cellWidth(100)] }]}></Table>`,
    }
  ],
  invalid: [
    {
      code: `import { Table, cellWidth } from "@patternfly/react-table";
        <Table cells={[{ transforms: [cellWidth('max')] }]}></Table>`,
      output: `import { Table, cellWidth } from "@patternfly/react-table";
        <Table cells={[{ transforms: [cellWidth(100)] }]}></Table>`,
      errors: [{
        message: `cellWidth('max') has been replaced with cellWidth(100)`,
        type: "CallExpression",
      }]
    },
    {
      code: `import { Table, cellWidth, cellHeightAuto } from '@patternfly/react-table';
        <Table cells={[{ transforms: [ cellWidth('max'), cellHeightAuto() ] }]}></Table>`,
      output: `import { Table, TableHeader, TableBody, cellWidth, cellHeightAuto } from '@patternfly/react-table';
        <Table cells={[{ transforms: [cellWidth(100)] }]}></Table>`,
      errors: [
        // {
        //   message: `cellHeightAuto transformer has been deprecated, import removed`,
        //   type: "CallExpression"
        // },
        {
          message: `cellHeightAuto transformer has been deprecated, removed usage`,
          type: "CallExpression"
        },
        {
          message: `cellWidth('max') has been replaced with cellWidth(100)`,
          type: "Property",
        }
      ]
    },
  ]
});
