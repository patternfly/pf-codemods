const { getPackageImports } = require('../helpers');

const renames = {
  'isCompactNav': 'REMOVE',
  'inPage': 'REMOVE',
  'isFullWidth': 'REMOVE',
  'isFullHeight': 'REMOVE'
};

// https://github.com/patternfly/patternfly-react/pull/4142
// https://github.com/patternfly/patternfly-react/pull/4116
module.exports = {
  create: function(context) {
    const imports = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => specifier.imported.name === 'Wizard');
      
    return !imports ? {} : {
      JSXOpeningElement(node) {
        if (imports.map(imp => imp.local.name).includes(node.name.name)) {
          node.attributes
          .filter(attribute => renames[attribute.name.name])
          .forEach(removedWizardProp => {
              context.report({
                node,
                message: `${removedWizardProp.name.name} prop for ${node.name.name} has been removed`,
                fix(fixer) {
                  return fixer.replaceText(removedWizardProp, '');
                }
              });
          });
        }
      }
    };
  }
};
