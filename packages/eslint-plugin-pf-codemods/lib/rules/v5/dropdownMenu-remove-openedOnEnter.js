const { renameProp } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/8179
module.exports = {
  meta: { fixable: 'code' },
  create: renameProp(
    'DropdownMenu',
    { openedOnEnter: '' },
    (node, attribute) =>
      `${attribute.name.name} prop for ${node.name.name} has been removed.`
  ),
};