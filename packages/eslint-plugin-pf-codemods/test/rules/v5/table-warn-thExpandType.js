const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/table-warn-thExpandType');

ruleTester.run("table-warn-thExpandType", rule, {
  valid: [
    {
      code: `import { Table } from '@patternfly/react-core'; <Table />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Table />`,
    },
    {
      code: `import { Th } from '@patternfly/react-core'; <Th />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Th />`,
    }
  ],
  invalid: [
    {
      code:   `import { Table } from '@patternfly/react-core'; <Table collapseAllAriaLabel="test" />`,
      output: `import { Table } from '@patternfly/react-core'; <Table collapseAllAriaLabel="test" />`,
      errors: [{
        message: `collapseAllAriaLabel has been updated to a string type. Workarounds casting this property to an empty string are no longer required.`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { Th } from '@patternfly/react-core'; <Th collapseAllAriaLabel="test" />`,
      output: `import { Th } from '@patternfly/react-core'; <Th collapseAllAriaLabel="test" />`,
      errors: [{
        message: `collapseAllAriaLabel has been updated to a string type. Workarounds casting this property to an empty string are no longer required.`,
        type: "JSXOpeningElement",
      }]
    },
  ]
});