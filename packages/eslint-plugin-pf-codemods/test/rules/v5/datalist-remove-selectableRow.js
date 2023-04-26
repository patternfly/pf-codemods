const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/datalist-remove-selectableRow');

ruleTester.run("datalist-remove-selectableRow", rule, {
  valid: [
    {
      code: `import { DataList } from '@patternfly/react-core'; <DataList onSelectableRowChange />`,
    },
    {
      code: `import { DataList } from '@patternfly/react-core/dist/esm/components/DataList/index.js'; <DataList onSelectableRowChange />`,
    },
    {
      // No @patternfly/react-core import
      code: `<DataList selectableRow />`,
    }
  ],
  invalid: [
    {
      code:   `import { DataList } from '@patternfly/react-core/dist/esm/components/DataList/index.js'; <DataList selectableRow />`,
      output: `import { DataList } from '@patternfly/react-core/dist/esm/components/DataList/index.js'; <DataList selectableRow />`,
      errors: [{
        message: `DataList's selectableRow property has been replaced with onSelectableRowChange. The order of the params in the callback has also been updated so that the event param is first.`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { DataList } from '@patternfly/react-core'; <DataList selectableRow />`,
      output: `import { DataList } from '@patternfly/react-core'; <DataList selectableRow />`,
      errors: [{
        message: `DataList's selectableRow property has been replaced with onSelectableRowChange. The order of the params in the callback has also been updated so that the event param is first.`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
