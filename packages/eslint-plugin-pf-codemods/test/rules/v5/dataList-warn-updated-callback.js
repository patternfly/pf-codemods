const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/dataList-warn-updated-callback");

ruleTester.run("dataList-warn-updated-callback", rule, {
  valid: [
    {
      code: `import { DataList } from '@patternfly/react-core'; <DataList />;`,
    },
    {
      // No @patternfly/react-core import
      code: `<DataList onSelectDataListItem />;`,
    },
  ],
  invalid: [
    {
      code: `import { DataList } from '@patternfly/react-core'; <DataList onSelectDataListItem />;`,
      output: `import { DataList } from '@patternfly/react-core'; <DataList onSelectDataListItem />;`,
      errors: [
        {
          message: `The "onSelectDataListItem" prop for DataList has been updated to include the event parameter as its first parameter. "onSelectDataListItem" handlers may require an update.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { DataList as PFDataList } from '@patternfly/react-core'; <PFDataList onSelectDataListItem />;`,
      output: `import { DataList as PFDataList } from '@patternfly/react-core'; <PFDataList onSelectDataListItem />;`,
      errors: [
        {
          message: `The "onSelectDataListItem" prop for DataList has been updated to include the event parameter as its first parameter. "onSelectDataListItem" handlers may require an update.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
