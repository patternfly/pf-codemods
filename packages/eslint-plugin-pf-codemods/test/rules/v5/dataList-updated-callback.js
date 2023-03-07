const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/dataList-updated-callback");

ruleTester.run("dataList-updated-callback", rule, {
  valid: [
    {
      code: `import { DataList } from '@patternfly/react-core'; <DataList />;`,
    },
    {
      code: `import { DataList } from '@patternfly/react-core'; <DataList onSelectDataListItem={() => onSelect()} />;`,
    },
    {
      code: `import { DataList } from '@patternfly/react-core'; const onSelect = () => {}; <DataList onSelectDataListItem={onSelect} />;`,
    },
    {
      code: `import { DataList } from '@patternfly/react-core'; function onSelect() {}; <DataList onSelectDataListItem={onSelect} />;`,
    },
    {
      // No @patternfly/react-core import
      code: `<DataList onSelectDataListItem />;`,
    },
  ],
  invalid: [
    {
      code: `import { DataList } from '@patternfly/react-core'; <DataList onSelectDataListItem={(id) => onSelect(id)} />;`,
      output: `import { DataList } from '@patternfly/react-core'; <DataList onSelectDataListItem={(_event, id) => onSelect(id)} />;`,
      errors: [
        {
          message: `The "onSelectDataListItem" prop for DataList has been updated to include the "event" parameter as its first parameter. "onSelectDataListItem" handlers may require an update.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { DataList } from '@patternfly/react-core'; <DataList onSelectDataListItem={id => onSelect(id)} />;`,
      output: `import { DataList } from '@patternfly/react-core'; <DataList onSelectDataListItem={(_event, id) => onSelect(id)} />;`,
      errors: [
        {
          message: `The "onSelectDataListItem" prop for DataList has been updated to include the "event" parameter as its first parameter. "onSelectDataListItem" handlers may require an update.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { DataList } from '@patternfly/react-core'; const onSelect = (id) => {}; <DataList onSelectDataListItem={onSelect} />;`,
      output: `import { DataList } from '@patternfly/react-core'; const onSelect = (_event, id) => {}; <DataList onSelectDataListItem={onSelect} />;`,
      errors: [
        {
          message: `The "onSelectDataListItem" prop for DataList has been updated to include the "event" parameter as its first parameter. "onSelectDataListItem" handlers may require an update.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { DataList } from '@patternfly/react-core'; function onSelect(id) {}; <DataList onSelectDataListItem={onSelect} />;`,
      output: `import { DataList } from '@patternfly/react-core'; function onSelect(_event, id) {}; <DataList onSelectDataListItem={onSelect} />;`,
      errors: [
        {
          message: `The "onSelectDataListItem" prop for DataList has been updated to include the "event" parameter as its first parameter. "onSelectDataListItem" handlers may require an update.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { DataList } from '@patternfly/react-core'; <DataList onSelectDataListItem={this.onSelect} />;`,
      output: `import { DataList } from '@patternfly/react-core'; <DataList onSelectDataListItem={this.onSelect} />;`,
      errors: [
        {
          message: `The "onSelectDataListItem" prop for DataList has been updated to include the "event" parameter as its first parameter. "onSelectDataListItem" handlers may require an update.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { DataList as PFDataList } from '@patternfly/react-core'; <PFDataList onSelectDataListItem={(id) => onSelect(id)} />;`,
      output: `import { DataList as PFDataList } from '@patternfly/react-core'; <PFDataList onSelectDataListItem={(_event, id) => onSelect(id)} />;`,
      errors: [
        {
          message: `The "onSelectDataListItem" prop for PFDataList has been updated to include the "event" parameter as its first parameter. "onSelectDataListItem" handlers may require an update.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
