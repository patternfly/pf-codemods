import { moveSpecifiers } from '../../helpers';

const specifiersToMove = [
  'DraggableItemPosition',
  'DragDropContext',
  'DragDrop',
  'DraggableProps',
  'Draggable',
  'Droppable',
  'DroppableContext',
];

const fromPackage = '@patternfly/react-core';
const toPackage = '@patternfly/react-core/deprecated';
const messageAfterImportNameChange =
  "been deprecated. Running the fix flag will update your imports to our deprecated package, but we suggest using our new drag and drop implementation (DragDropSort component), that lives in '@patternfly/react-drag-drop' package.";

// https://github.com/patternfly/patternfly-react/pull/10181
module.exports = {
  meta: { fixable: 'code' },
  create: moveSpecifiers(
    specifiersToMove,
    fromPackage,
    toPackage,
    messageAfterImportNameChange
  ),
};
