const { getPackageImports } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/4136
module.exports = {
  meta: { fixable: 'code' },
  create: function(context) {
    const imports = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => ['Wizard', 'WizardBody', 'WizardToggle'].includes(specifier.imported.name));
    const sourceCode = context.getSourceCode();
      
    return imports.length == 0 ? {} : {
      JSXOpeningElement(node) {
        if (imports.map(imp => imp.local.name).includes(node.name.name)) {
          const attribute = node.attributes.find(node => node.name && node.name.name === 'hasBodyPadding');
          if (attribute) {
            context.report({
              node,
              message: `hasBodyPadding prop has been removed for ${node.name.name}. Use hasNoBodyPadding instead`,
              fix(fixer) {
                const attrText = attribute.value ? sourceCode.getText(attribute.value.expression) : null;
                return fixer.replaceText(attribute, attrText && attrText.includes('false') ? 'hasNoBodyPadding' : '');
              }
            });
          }
        }
      }
    };
  }
};
