const { renameProp } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/4014
module.exports = {
  meta: { fixable: 'code' },
  create: renameProp(
    ['Gallery', 'Grid', 'Level', 'Split', 'Stack'],
    { 'gutter': 'hasGutter' },
    node => `gutter prop has been removed for ${node.name.name}. Use hasGutter instead`,
    true
  )
};