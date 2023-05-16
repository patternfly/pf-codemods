const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/table-rename-isHoverable");

ruleTester.run("table-rename-isHoverable", rule, {
  valid: [
    {
      code: `import { Tr } from '@patternfly/react-table'; <Tr isClickable />`,
    },
    // TableComposable after being renamed to Table
    {
      code: `import { Table } from '@patternfly/react-table'; <Table />`,
    },
    // No @patternfly import
    {
      code: `<Tr isHoverable />`,
    },
    // No @patternfly import
    {
      code: `<Table rows={rows} />`,
    },
  ],
  invalid: [
    {
      code: `import { Tr } from '@patternfly/react-table'; <Tr isHoverable />`,
      output: `import { Tr } from '@patternfly/react-table'; <Tr isClickable />`,
      errors: [
        {
          message: `The "isHoverable" prop on Tr has been renamed to "isClickable".`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Tr } from '@patternfly/react-table/dist/esm/components/Table/index.js'; <Tr isHoverable />`,
      output: `import { Tr } from '@patternfly/react-table/dist/esm/components/Table/index.js'; <Tr isClickable />`,
      errors: [
        {
          message: `The "isHoverable" prop on Tr has been renamed to "isClickable".`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Table } from '@patternfly/react-table'; <Table rows={rows} />`,
      output: `import { Table } from '@patternfly/react-table'; <Table rows={rows} />`,
      errors: [
        {
          message: `The IRow interface for the "rows" prop on Table has had its "isHoverable" prop renamed to "isClickable". If you are using "isHoverable" it must be updated manually.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Table } from '@patternfly/react-table/deprecated'; <Table rows={rows} />`,
      output: `import { Table } from '@patternfly/react-table/deprecated'; <Table rows={rows} />`,
      errors: [
        {
          message: `The IRow interface for the "rows" prop on Table has had its "isHoverable" prop renamed to "isClickable". If you are using "isHoverable" it must be updated manually.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
