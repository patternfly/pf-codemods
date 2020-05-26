const { renameProp } = require('../helpers');
const { getPackageImports } = require('../helpers');

// https://github.com/patternfly/patternfly-react/pull/4146
module.exports = {
  create: renameProp(
    'Tabs',
    {'variant': 'component'},
    node => `variant prop has been renamed for ${node.name.name}. Use component instead`
  ),

  create: function(context) {
      const variantEnumImports = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => specifier.imported.name.endsWith('Variant'));
    return !variantEnumImports ? {} : {
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
      }
    };
  }
};