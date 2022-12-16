const { renameProp } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/4116
module.exports = {
  meta: { fixable: 'code' },
  create: renameProp(
    'Label',
    { isCompact: '' },
    (node, attribute) => `${attribute.name.name} prop for ${node.name.name} has been removed`
  )
};
