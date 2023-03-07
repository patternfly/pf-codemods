const { renameProp } = require('../../helpers');

  // https://github.com/patternfly/patternfly-react/pull/https://github.com/patternfly/patternfly-react/pull/8724
  module.exports = {
    meta: { fixable: 'code' },
    create: 
    renameProp(
      'Popper',
      {'popperMatchesTriggerWidth': ''},
      node =>  `popperMatchesTriggerWidth prop has been removed for ${node.name.name}, minWidth now covers this by default.`
    ),
  };
