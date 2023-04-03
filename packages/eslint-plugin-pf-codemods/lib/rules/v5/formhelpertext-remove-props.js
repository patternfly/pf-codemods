const { renameProp } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/8810
module.exports = {
  meta: { fixable: 'code' },
  create: renameProp(
    'FormHelperText',
    { 
      isError: '',
      isHidden: '',
      icon: '',
      component: ''
    },
    (node, attribute) =>
      `${attribute.name.name} prop for ${node.name.name} has been removed. Use HelperText and HelperTextItem directly in children.`
  ),
};
