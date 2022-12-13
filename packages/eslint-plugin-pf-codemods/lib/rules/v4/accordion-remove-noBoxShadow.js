const { renameProp } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/4022
module.exports = {
  meta: { fixable: 'code' },
  create: renameProp(
    'Accordion',
    {'noBoxShadow': ''},
    node =>  `noBoxShadow prop has been removed for ${node.name.name}. If a shadow is needed, the accordion can be placed in a card, or a shadow can be applied either using CSS or a box-shadow utility class`
  ),
};