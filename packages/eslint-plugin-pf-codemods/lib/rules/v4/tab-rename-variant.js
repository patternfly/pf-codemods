const { getPackageImports, renamePropsOnNode } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/4146
module.exports = {
  meta: { fixable: 'code' },
  create: function(context) {
    const tabImports = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => specifier.imported.name === 'Tabs');
    const variantEnumImports = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => specifier.imported.name === 'TabsVariant');
    
    return tabImports.length === 0 && variantEnumImports.length === 0 ? {} : {
      ImportSpecifier(node) {
        if (node.parent.source.value === '@patternfly/react-core'
          && node.imported.name === 'TabsVariant'
        ) {
          context.report({
            node,
            message: `${node.local.name} enum has been renamed to TabsComponent`,
            fix(fixer) {
              return fixer.replaceText(node, 'TabsComponent');
            }
          });
        }
      },
      MemberExpression(node) {
        if (variantEnumImports.map(imp => imp.local.name).includes(node.object.name)) {
          context.report({
            node,
            message: `${node.object.name} enum has been renamed to TabsComponent`,
            fix(fixer) {
              return fixer.replaceText(node.object, 'TabsComponent');
            }
          });
        }
      },
      JSXOpeningElement(node) {
        renamePropsOnNode(context, tabImports, node, {
          'Tabs' : {
            'variant': { newName: 'component' }
          }
        });
      }
    };
  },
};