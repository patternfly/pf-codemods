import { DragDrop, Droppable, Draggable } from '@patternfly/react-core';

export const DragDropDeprecatedInput = () => (
  <DragDrop onDrop={onDrop}>
    <Droppable>
      <Draggable key={1}>Item 1</Draggable>
      <Draggable key={2}>Item 2</Draggable>
    </Droppable>
  </DragDrop>
);
