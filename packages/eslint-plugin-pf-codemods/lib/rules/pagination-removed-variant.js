const { getPackageImports } = require('../helpers');

// https://github.com/patternfly/patternfly-react/pull/YOURNUMBERHERE
module.exports = {
  create: function(context) {
    const imports = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => specifier.imported.name === 'Pagination');
      
    return imports.length === 0 ? {} : {
      JSXOpeningElement(node) {
        if (imports.map(imp => imp.local.name).includes(node.name.name)) {
          const attribute = node.attributes.find(node => node.name && node.name.name === 'variant');
          if (attribute) {
            const attributeValue = context.getSourceCode().getText(attribute.value);
            if (['"left"', '"right"'].includes(attributeValue))
              context.report({
                node,
                message: `variant ${attributeValue} has been removed from ${node.name.name}`,
                fix(fixer) {
                  return fixer.replaceText(attribute, '');
                }
              });
          }
        }
      }
    };
  }
};
