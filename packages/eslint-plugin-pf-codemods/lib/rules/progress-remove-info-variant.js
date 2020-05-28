const { getPackageImports } = require('../helpers');

// https://github.com/patternfly/patternfly-react/pull/3886
module.exports = {
  create: function(context) {
    const progressImports = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => specifier.imported.name === 'Progress');
      
    return progressImports.length === 0 ? {} : {
      JSXOpeningElement(node) {
        if (progressImports.map(imp => imp.local.name).includes(node.name.name)) {
          const progressAttribute = node.attributes.find(node => node.name && node.name.name === 'variant');
          if (progressAttribute) {
            const progressValueString = context.getSourceCode().getText(progressAttribute.value);
            if (progressValueString.includes('info')) {
              context.report({
                node,
                message: `info variant which adds no styling has been removed for ${node.name.name}. Don't pass this prop`,
                fix(fixer) {
                  return fixer.replaceText(progressAttribute, '');
                }
              });
            }
          }
        }
      }
    };
  }
};