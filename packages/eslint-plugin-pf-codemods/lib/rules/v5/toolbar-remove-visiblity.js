const { renameProp } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/8212
module.exports = {
  meta: { fixable: 'code' },
  create: renameProp(
    'ToolbarContent',
    { visiblity: 'visibility' },
    (node, attribute) => `${attribute.name.name} prop for ${node.name.name} has been removed and replaced with the visibility prop.`
  )
};
