const { renameProp } = require('../helpers');

// https://github.com/patternfly/patternfly-react/pull/3945
module.exports = {
  create: renameProp(
    'Select',
    { 'isExpanded': 'isOpen' },
    node => `isExpanded has been renamed to isOpen for ${node.name.name}`
  )
};