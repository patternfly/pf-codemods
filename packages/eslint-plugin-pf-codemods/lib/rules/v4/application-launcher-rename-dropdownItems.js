const { renameProp } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/3929
module.exports = {
  meta: { fixable: 'code' },
  create: renameProp(
    'ApplicationLauncher',
    {'dropdownItems': 'items'},
    node => `dropdownItems prop has been removed for ${node.name.name}. Use items instead`
  )
};