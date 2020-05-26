const { getPackageImports } = require('../helpers');

// https://github.com/patternfly/patternfly-react/pull/4146
module.exports = {

  create: function(context) {
      const imports = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => specifier.imported.name === 'Tabs');
      const variantEnumImports = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => specifier.imported.name.endsWith('Variant'));
    return !imports && !variantEnumImports ? {} : {
      JSXExpressionContainer(node) {
        if (node.expression && node.expression.object && variantEnumImports.map(imp => imp.local.name).includes(node.expression.object.name)) {
          context.report({
            node,
            message: `${node.expression.object.name} enum has been renamed to TabsComponent`,
            fix(fixer) {
              return fixer.replaceText(node.expression.object.name, 'TabsComponent');
            }
          });
        }
      },

      JSXOpeningElement(node) {
        if (imports.map(imp => imp.local.name).includes(node.name.name)) {
          node.attributes
          .filter(attribute => 'variant')
              context.report({
                node,
                message: `variant prop has been renamed for ${node.name.name} . Use component prop instead`,
                fix(fixer) {
                  return fixer.replaceText('variant', 'component');
                }
              });
        }
      }
    };
  }
};