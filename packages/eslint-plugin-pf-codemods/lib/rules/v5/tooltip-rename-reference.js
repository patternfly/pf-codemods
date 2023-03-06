const { renameProp } = require('../../helpers');

  // https://github.com/patternfly/patternfly-react/pull/8733
  module.exports = {
    meta: { fixable: 'code' },
    create: renameProp(
      'Tooltip',
      {'reference': 'triggerRef'},
      node =>  `The 'reference' prop for ${node.name.name} has been renamed to 'triggerRef'.`
    ),
  };
