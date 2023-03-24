const { getPackageImports, ensureImports } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/8820
module.exports = {
  meta: { fixable: 'code' },
  create: function(context) { 
    const imports = getPackageImports(context, '@patternfly/react-core');
    const menuInputImport = imports.find(imp => imp.imported.name === 'MenuInput');

    return imports.length === 0 || !menuInputImport ? {} : { 
      ImportDeclaration(node) {
        ensureImports(context, node, '@patternfly/react-core', ['MenuSearch', 'MenuSearchInput']);
      },
      JSXOpeningElement(node) {
        if (node.name.name === menuInputImport.local.name) {
          context.report({
            node,
            message: "MenuInput has been renamed to MenuSearchInput and MenuSearch has been added as a wrapper.",
            fix(fixer) {
              const fixes = [];

              fixes.push(
                fixer.insertTextBefore(node, "<MenuSearch>"),
                fixer.replaceText(node.name, "MenuSearchInput"),
                fixer.insertTextAfter(node.parent, "</MenuSearch>")
              );

              if(node?.parent?.closingElement) {
                fixes.push(fixer.replaceText(node.parent.closingElement.name, "MenuSearchInput"));
              }
              
              return fixes;
            }
          });
        }
      }
    };
  }
};
