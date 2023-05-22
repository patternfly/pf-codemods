const { getFromPackage } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/8517
module.exports = {
  meta: { fixable: 'code' },
  create: function(context) {
    const imports = getFromPackage(context, '@patternfly/react-core')
      .imports.filter(specifier => specifier.imported.name === 'Tabs');
    const sourceCode = context.getSourceCode();
      
    return imports.length == 0 ? {} : {
      JSXOpeningElement(node) {
        if (imports.map(imp => imp.local.name).includes(node.name.name)) {
          const attribute = node.attributes.find(a => a.name?.name === 'hasBorderBottom');
          if (attribute) {
            context.report({
              node,
              message: `hasBorderBottom prop has been removed for ${node.name.name}. Use hasNoBorderBottom instead`,
              fix(fixer) {
                const attrText = attribute.value ? sourceCode.getText(attribute.value.expression) : 'true';
                if (['true', 'false'].includes(attrText.trim())) {
                  return fixer.replaceText(attribute, attrText && attrText.trim() === 'false' ? 'hasNoBorderBottom' : '');
                }
                return fixer.replaceText(attribute, `hasNoBorderBottom={!(${attrText})}`)
              }
            });
          }
        }
      }
    };
  }
};
