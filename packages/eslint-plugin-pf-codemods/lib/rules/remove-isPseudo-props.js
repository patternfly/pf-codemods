const { renameProps } = require('../helpers');

// https://github.com/patternfly/patternfly-react/pull/4116
const renames = {
  'Button': {
    isHover: '',
    isFocus: ''
  },
  'Toggle': {
    isHover: '',
    isFocus: ''
  },
  'KebabToggle': {
    isHover: '',
    isFocus: ''
  },
  'DropdownToggle': {
    isHover: '',
    isFocus: ''
  },
  'SelectToggle': {
    isHovered: '',
    isFocus: ''
  },
  'Expandable': {
    isHover: '',
    isFocus: ''
  },
  'ExpandableSection': {
    isHover: '',
    isFocus: ''
  },
  'OptionsMenuToggle': {
    isFocused: '',
    isHovered: ''
  },
  'OptionsMenuToggleWithText': {
    isFocused: '',
    isHovered: ''
  },
  'ContextSelectorItem': {
    isHovered: ''
  },
  'ContextSelectorToggle': {
    isFocused: '',
    isHovered: ''
  },
};

module.exports = {
  create: renameProps(renames)
};
