const { renameProp } = require('../helpers');

// https://github.com/patternfly/patternfly-react/pull/3929
module.exports = {
  create: renameProp(
    'ApplicationLauncher',
    {'dropdownItems': 'items'},
    node => `dropdownItems prop has been removed for ${node.name.name}. Use items instead`
  )
};