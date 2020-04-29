const { getPackageImports } = require('../helpers');

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
    'rememberMeAriaLabel': 'REMOVE'
  },
  'Modal': {
    'ariaDescribedById': 'modalContentAriaDescribedById'
  },
  'ModalContent': {
    'ariaDescribedById': 'modalBoxAriaDescribedById'
  },
  'OptionsMenu': {
    'ariaLabelMenu': 'REMOVE'
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
  create: function(context) {
    const imports = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => Object.keys(renames).includes(specifier.imported.name));
      
    return !imports ? {} : {
      JSXOpeningElement(node) {
        if (imports.map(imp => imp.local.name).includes(node.name.name)) {
          const renamedProps = renames[node.name.name];
          node.attributes
            .filter(attribute => renamedProps[attribute.name.name])
            .forEach(ariaAttribute => {
              if (renamedProps[ariaAttribute.name.name] === 'REMOVE') {
                context.report({
                  node,
                  message: `${ariaAttribute.name.name} prop for ${node.name.name} has been removed`,
                  fix(fixer) {
                    return fixer.replaceText(ariaAttribute, '');
                  }
                });
              }
              else {
                context.report({
                  node,
                  message: `${ariaAttribute.name.name} prop for ${node.name.name} has been renamed to ${renamedProps[ariaAttribute.name.name]}`,
                  fix(fixer) {
                    return fixer.replaceText(ariaAttribute.name, renamedProps[ariaAttribute.name.name]);
                  }
                });
              }
            });
        }
      }
    };
  }
};