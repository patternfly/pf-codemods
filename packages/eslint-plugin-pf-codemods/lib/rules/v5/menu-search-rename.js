const { getFromPackage, ensureImports } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/8820
module.exports = {
  meta: { fixable: 'code' },
  create: function(context) { 
    const { imports } = getFromPackage(context, '@patternfly/react-core');
    const menuInputImport = imports.find(imp => imp.imported.name === 'MenuInput');

    return imports.length === 0 || !menuInputImport ? {} : { 
      ImportDeclaration(node) {
        if(menuInputImport) {
          context.report({
            node,
            message: 'add missing imports MenuSearch, MenuSearchInput from @patternfly/react-core',
            fix(fixer) {
              const fixes = [];
              
              fixes.push(
                fixer.replaceText(menuInputImport, 'MenuSearch'),
                fixer.insertTextAfter(node.specifiers[node.specifiers.length - 1], `, MenuSearchInput`)
              );
              
              return fixes;
            }
          })
        }
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
