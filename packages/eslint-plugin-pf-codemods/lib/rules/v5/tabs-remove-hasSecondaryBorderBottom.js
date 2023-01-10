const { renameProp } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/8517
module.exports = {
  meta: { fixable: 'code' },
  create: renameProp(
    'Tabs',
    {'hasSecondaryBorderBottom': ''},
    node =>  `hasSecondaryBorderBottom prop has been removed for ${node.name.name}.`
  ),
};
