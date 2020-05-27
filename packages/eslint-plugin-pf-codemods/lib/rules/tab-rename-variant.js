const { getPackageImports } = require('../helpers');
const { renameProps0 } = require('../helpers')

// https://github.com/patternfly/patternfly-react/pull/4146

const renames= {
  'Tabs' : {
    'variant': 'component'
  }
}
module.exports = {

  create: function(context) {
      const imports = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => specifier.imported.name === 'Tabs');
      const variantEnumImports = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => specifier.imported.name.endsWith('Variant'));
    return !imports && !variantEnumImports ? {} : {

      JSXIdentifier(node) {
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
        renameProps0(context, imports, node, renames);
      }
      
    };
  },
};