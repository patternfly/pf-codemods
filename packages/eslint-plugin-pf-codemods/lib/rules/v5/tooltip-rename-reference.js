const { renameProp } = require('../../helpers');

  // https://github.com/patternfly/patternfly-react/pull/8733
  module.exports = {
    meta: { fixable: 'code' },
    create: renameProp(
      'Tooltip',
      {'reference': 'triggerRef'},
      node =>  `reference prop has been removed for ${node.name.name} and replaced with the triggerRef prop.`
    ),
  };
