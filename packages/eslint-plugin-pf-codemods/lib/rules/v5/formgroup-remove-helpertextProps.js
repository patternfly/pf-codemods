const { renameProp } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/8810
module.exports = {
  meta: { fixable: 'code' },
  create: renameProp(
    'FormGroup',
    { 
      helperText: '',
      helperTextInvalid: '',
      validated: '',
      helperTextIcon: '',
      helperTextInvalidIcon: '',
      isHelperTextBeforeField: '' 
    },
    (node, attribute) =>
      `${attribute.name.name} prop for ${node.name.name} has been removed. Use FormHelperText, HelperText, and HelperTextItem directly inside children.`
  ),
};
