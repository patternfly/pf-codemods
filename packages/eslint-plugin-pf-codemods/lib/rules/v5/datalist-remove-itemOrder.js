const { renameProp } = require('../../helpers');

https://github.com/patternfly/patternfly-react/pull/8388/files
  module.exports = {
    meta: { fixable: 'code' },
    create: renameProp(
      'DataList',
      {'itemOrder': ''},
      node =>  `itemOrder prop has been removed for ${node.name.name}.`
    ),
  };
