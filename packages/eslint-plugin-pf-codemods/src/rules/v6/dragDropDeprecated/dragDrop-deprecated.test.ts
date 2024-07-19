const ruleTester = require('../../ruletester');
import * as rule from './dragDrop-deprecated';

ruleTester.run('dragDrop-deprecated', rule, {
  valid: [
    {
      code: `<DragDrop onDrop={onDrop}>
      <Droppable>
        <Draggable key={1}>Item 1</Draggable>
        <Draggable key={2}>Item 2</Draggable>
      </Droppable>
    </DragDrop>`,
    },
  ],
  invalid: [
    {
      code: `import { DragDrop, Droppable, Draggable } from '@patternfly/react-core';

      export const DragDropDeprecatedInput = () => (
        <DragDrop onDrop={onDrop}>
          <Droppable>
            <Draggable key={1}>Item 1</Draggable>
            <Draggable key={2}>Item 2</Draggable>
          </Droppable>
        </DragDrop>
      );
      `,
      output: `import {\n\tDragDrop,\n\tDroppable,\n\tDraggable\n} from '@patternfly/react-core/deprecated';

      export const DragDropDeprecatedInput = () => (
        <DragDrop onDrop={onDrop}>
          <Droppable>
            <Draggable key={1}>Item 1</Draggable>
            <Draggable key={2}>Item 2</Draggable>
          </Droppable>
        </DragDrop>
      );
      `,
      errors: [
        {
          message: `DragDrop, Droppable, and Draggable have been deprecated. Running the fix flag will update your imports to our deprecated package, but we suggest using our new drag and drop implementation (DragDropSort component), that lives in '@patternfly/react-drag-drop' package.`,
          type: 'ImportDeclaration',
        },
      ],
    },
  ],
});
