const { renameProp } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/8199
module.exports = {
  meta: { fixable: 'code' },
  create: renameProp(
    'Divider',
    {'isVertical': `orientation={{ default: 'vertical' }}`},
    node =>  `isVertical prop has been removed for ${node.name.name} and replaced with the orientation prop, which can specify verticality at various breakpoints.`
  ),
};