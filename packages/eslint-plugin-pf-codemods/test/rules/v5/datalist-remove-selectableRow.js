const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/dataList-remove-selectableRow');

ruleTester.run("dataList-remove-selectableRow", rule, {
  valid: [
    {
      code: `import { DataList } from '@patternfly/react-core'; <DataList onSelectableRowChange />`,
    },
    {
      // No @patternfly/react-core import
      code: `<DataList selectableRow />`,
    }
  ],
  invalid: [
    {
      code:   `import { DataList } from '@patternfly/react-core'; <DataList selectableRow />`,
      output: `import { DataList } from '@patternfly/react-core'; <DataList selectableRow />`,
      errors: [{
        message: `DataList's selectableRow.onChange property has been replaced with onSelectableRowChange. The order of the params in the callback has also been updated so that the event param is first.`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
