const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/datalist-remove-itemOrder');

ruleTester.run("datalist-remove-itemOrder", rule, {
  valid: [
    {
      code: `import { DataList } from '@patternfly/react-core'; <DataList />`,
    },
    {
      // No @patternfly/react-core import
      code: `<DataList itemOrder />`,
    }
  ],
  invalid: [
    {
      code:   `import { DataList } from '@patternfly/react-core'; <DataList itemOrder />`,
      output: `import { DataList } from '@patternfly/react-core'; <DataList  />`,
      errors: [{
        message: `itemOrder prop has been removed for DataList.`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
