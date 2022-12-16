const { renameProp } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/4246
module.exports = {
  meta: { fixable: 'code' },
  create: renameProp(
    'PageHeader',
    {
      'toolbar': 'headerTools'
    },
    node => `toolbar prop has been removed from ${node.name.name}. Use headerTools instead`
  ),
};