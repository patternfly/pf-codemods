const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/table-warn-thExpandType');

ruleTester.run("table-warn-thExpandType", rule, {
  valid: [
    {
      code: `import { Table } from '@patternfly/react-table'; <Table />`,
    },
    {
      // No @patternfly/react-table import
      code: `<Table />`,
    },
    {
      code: `import { Th } from '@patternfly/react-table'; <Th />`,
    },
    {
      // No @patternfly/react-table import
      code: `<Th />`,
    }
  ],
  invalid: [
    {
      code:   `import { Table } from '@patternfly/react-table'; <Table collapseAllAriaLabel="test" />`,
      output: `import { Table } from '@patternfly/react-table'; <Table collapseAllAriaLabel="test" />`,
      errors: [{
        message: `collapseAllAriaLabel has been updated to a string type. Workarounds casting this property to an empty string are no longer required.`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { Th } from '@patternfly/react-table'; <Th collapseAllAriaLabel="test" />`,
      output: `import { Th } from '@patternfly/react-table'; <Th collapseAllAriaLabel="test" />`,
      errors: [{
        message: `collapseAllAriaLabel has been updated to a string type. Workarounds casting this property to an empty string are no longer required.`,
        type: "JSXOpeningElement",
      }]
    },
  ]
});