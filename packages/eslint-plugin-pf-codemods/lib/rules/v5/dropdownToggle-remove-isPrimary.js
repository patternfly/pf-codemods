const { getPackageImports } = require('../../helpers');

  // https://github.com/patternfly/patternfly-react/pull/8179
  module.exports = {
    meta: { fixable: 'code' },
    create: function(context) {
      const packageImport = getPackageImports(context, '@patternfly/react-core')
        .filter(specifier => specifier.imported.name == 'DropdownToggle');
  
      return packageImport.length === 0 ? {} : {
        JSXOpeningElement(node) {
          if (packageImport.map(imp => imp.local.name).includes(node.name.name)) {
            const isPrimaryAttr = node.attributes.find(a => a.name?.name === 'isPrimary');
            if (isPrimaryAttr) {
              context.report({
                node,
                message: `isPrimary prop has been removed for ${node.name.name} and replaced by using 'primary' value on the toggleVariant prop.`,
                fix(fixer) {
                  return fixer.replaceText(isPrimaryAttr, 'toggleVariant="primary"');
                }
              });
            }
          }
        }
      };
    }
  };