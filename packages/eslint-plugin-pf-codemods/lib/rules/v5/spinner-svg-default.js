const { getPackageImports } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/8183
module.exports = {
  meta: { fixable: 'code' },
  create: function(context) {
    const spinnerImports = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => specifier.imported.name == 'Spinner');
      
    return spinnerImports.length === 0 ? {} : {
      JSXOpeningElement(node) {
        if (spinnerImports.map(imp => imp.local.name).includes(node.name.name)) {
          const svgAttribute = node.attributes.find(n => n.name && n.name.name === 'isSVG');
          if (svgAttribute && svgAttribute?.value?.expression?.value !== false) {
            context.report({
              node,
              message: `Spinner isSVG prop default value has changed from false to true.`,
              fix(fixer) {
                return fixer.replaceText(svgAttribute, ``);
              }
            });
          }
        }
      }
    };
  }
};

