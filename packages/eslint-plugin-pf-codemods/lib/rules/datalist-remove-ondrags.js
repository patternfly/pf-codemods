const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/datalist-remove-ondrags');

ruleTester.run("datalist-remove-ondrags", rule, {
  valid: [
    {
      code: `import { DataList } from '@patternfly/react-core'; <DataList />`,
    },
    {
      // No @patternfly/react-core import
      code: `<DataList onDragFinish onDragStart onDragMove onDragCancel />`,
    }
  ],
  invalid: [
    {
      code:   `import { DataList } from '@patternfly/react-core'; <DataList onDragStart={e => console.log(e)} onDragMove onDragFinish onDragCancel />`,
      output: `import { DataList } from '@patternfly/react-core'; <DataList     />`,
      errors: [`onDragStart`, `onDragMove`, `onDragFinish`,`onDragCancel`].map( name => {
        return {
          message: name + ` prop for DataList has been removed. Implemednt drag and drop using the DragDrop component instead.`,
          type: "JSXOpeningElement",
        }
      }),
    }
  ]
});