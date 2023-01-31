const { renameProp } = require('../../helpers');

  // https://github.com/patternfly/patternfly-react/pull/8619
  module.exports = {
    meta: { fixable: 'code' },
    create: renameProp(
      'ClipboardCopy',
      {'switchDelay': ''},
      node =>  `switchDelay prop has been removed for ${node.name.name}`
    ),
  };
