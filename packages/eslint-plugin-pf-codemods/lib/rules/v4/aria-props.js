const { renameProps } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/3924
const renames = {
  'AboutModalContainer': {
    'ariaLabelledbyId': 'aboutModalBoxHeaderId',
    'ariaDescribedById': 'aboutModalBoxContentId'
  },
  'ChipButton': {
    'ariaLabel': 'aria-label'
  },
  'DropdownToggle': {
    'ariaHasPopup': 'aria-haspopup'
  },
  'LoginForm': {
    'rememberMeAriaLabel': ''
  },
  'Modal': {
    'ariaDescribedById': 'modalContentAriaDescribedById'
  },
  'ModalContent': {
    'ariaDescribedById': 'modalBoxAriaDescribedById'
  },
  'OptionsMenu': {
    'ariaLabelMenu': ''
  },
  'OptionsMenuItemGroup': {
    'ariaLabel': 'aria-label'
  },
  'OptionsMenuToggleWithText': {
    'ariaHasPopup': 'aria-haspopup'
  },
  'ProgressBar': {
    'ariaProps': 'progressBarAriaProps'
  },
  'ProgressContainer': {
    'ariaProps': 'progressBarAriaProps'
  },
  'Select': {
    'ariaLabelledBy': 'aria-labelledby',
    'ariaLabelTypeAhead': 'typeAheadAriaLabel',
    'ariaLabelClear': 'clearSelectionsAriaLabel',
    'ariaLabelToggle': 'toggleAriaLabel',
    'ariaLabelRemove': 'removeSelectionAriaLabel'
  },
  'SelectToggle': {
    'ariaLabelledBy': 'aria-labelledby',
    'ariaLabelToggle': 'aria-label'
  },
  'Wizard': {
    'ariaLabelNav': 'navAriaLabel',
    'ariaLabelCloseButton': 'closeButtonAriaLabel'
  },
  'WizardHeader': {
    'ariaLabelCloseButton': 'closeButtonAriaLabel'
  },
  'WizardNav': {
    'ariaLabel': 'aria-label'
  }
};

module.exports = {
  meta: { fixable: 'code' },
  create: renameProps(renames)
};
