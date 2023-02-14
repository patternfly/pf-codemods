const { renameProp } = require('../../helpers');

  // https://github.com/patternfly/patternfly-react/pull/8179
  module.exports = {
    meta: { fixable: 'code' },
    create: renameProp(
      'DropdownItem',
      {'isHovered': ''},
      node =>  `isHovered prop has been removed for ${node.name.name}.`
    ),
  };
