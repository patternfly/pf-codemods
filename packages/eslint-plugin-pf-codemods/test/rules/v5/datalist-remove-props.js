const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/datalist-remove-props');

ruleTester.run("datalist-remove-props", rule, {
  valid: [
    {
      code: `import { DataList } from '@patternfly/react-core'; <DataList />`,
    },
    {
      code: `import { DataList } from '@patternfly/react-core/dist/esm/components/DataList/index.js'; <DataList />`,
    },
    {
      // No @patternfly/react-core import
      code: `<DataList onDragFinish onDragStart onDragMove onDragCancel itemOrder />`,
    }
  ],
  invalid: [
    {
      code:   `import { DataList } from '@patternfly/react-core'; <DataList onDragStart={e => console.log(e)} onDragMove onDragFinish onDragCancel />`,
      output: `import { DataList } from '@patternfly/react-core'; <DataList     />`,
      errors: [`onDragStart`, `onDragMove`, `onDragFinish`,`onDragCancel`].map( name => {
        return {
          message: name + ` prop for DataList has been removed. Implement drag and drop using the DragDrop component instead.`,
          type: "JSXOpeningElement",
        }
      }),
    },
    {
      code:   `import { DataList } from '@patternfly/react-core/dist/esm/components/DataList/index.js'; <DataList onDragStart={e => console.log(e)} onDragMove onDragFinish onDragCancel />`,
      output: `import { DataList } from '@patternfly/react-core/dist/esm/components/DataList/index.js'; <DataList     />`,
      errors: [`onDragStart`, `onDragMove`, `onDragFinish`,`onDragCancel`].map( name => {
        return {
          message: name + ` prop for DataList has been removed. Implement drag and drop using the DragDrop component instead.`,
          type: "JSXOpeningElement",
        }
      }),
    },
    {
      code:   `import { DataList } from '@patternfly/react-core'; <DataList itemOrder />`,
      output: `import { DataList } from '@patternfly/react-core'; <DataList  />`,
      errors: [{
        message: `itemOrder prop for DataList has been removed.`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});