const { getPackageImports } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/8206

module.exports = {
  meta: { fixable: 'code' },
  create: function(context) {
    const expandableSectionImports = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => specifier.imported.name == 'ExpandableSection');
      
    return expandableSectionImports.length === 0 ? {} : {
      JSXOpeningElement(node) {
        if (expandableSectionImports.map(imp => imp.local.name).includes(node.name.name)) {
          const sizeAttribute = node.attributes.find(n => n.name && n.name.name === 'displaySize');;
          if (sizeAttribute && sizeAttribute.value.value === "large") {
            const sizeValueString = context.getSourceCode().getText(sizeAttribute.value);
            const valueGuess = 'lg';
            context.report({
              node,
              message: `displaySize ${sizeValueString} has been renamed for ${node.name.name}. Use displaySize="lg" instead.`,
              fix(fixer) {
                return fixer.replaceText(sizeAttribute.value, `"${valueGuess}"`);
              }
            });
          }
        }
      }
    };
  }
};