const { renameProp } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/8388
module.exports = {
  meta: { fixable: 'code' },
  create: renameProp(
    'DataList',
    {
      onDragFinish: '',
      onDragStart: '',
      onDragMove: '',
      onDragCancel: '',
    },
    (node, attribute) => `${attribute.name.name} prop for ${node.name.name} has been removed. Implement drag and drop using the DragDrop component instead.`
  )
};
