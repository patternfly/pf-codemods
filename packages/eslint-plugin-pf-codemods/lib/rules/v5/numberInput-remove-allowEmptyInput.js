const { renameProp } = require('../../helpers');

  // https://github.com/patternfly/patternfly-react/pull/8715
  module.exports = {
    meta: { fixable: 'code' },
    create: renameProp(
      'NumberInput',
      {'allowEmptyInput': ''},
      node =>  `allowEmptyInput prop has been removed for ${node.name.name}, allowing empty input is now the default behavior.`
    ),
  };
