const { renameProp } = require('../helpers');

// https://github.com/patternfly/patternfly-react/pull/3920
module.exports = {
  create: renameProp(
    'Modal',
    {'isSmall': 'variant="small"', 'isLarge': 'variant="large"'},
    (node, attribute, replacement) => `${node.name.name} has replaced ${attribute.name.name} prop with ${replacement}`
  )
};