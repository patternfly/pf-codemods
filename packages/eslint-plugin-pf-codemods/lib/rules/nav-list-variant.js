const { getPackageImports } = require('../helpers');

// https://github.com/patternfly/patternfly-react/pull/4225
module.exports = {
  create: function(context) {
    const imports = getPackageImports(context, '@patternfly/react-core')
        .filter(specifier => ['NavList', 'Nav'].includes(specifier.imported.name));
    const navImport = imports.find(imp => imp.imported.name === 'Nav');
    const NavListImport = imports.find(imp => imp.imported.name === 'NavList');

    return !NavListImport ? {} : {
      JSXElement(node) {
        if (NavListImport.local.name === node.openingElement.name.name) {
          const navImportName = "Nav";
          const variantAttr = node.openingElement.attributes.find(attribute => {
            return attribute.name.name === 'variant'
          });
          const variantVal = context.getSourceCode().getText(variantAttr) || '"horizontal" | "default" | "tertiary"';

          let hasNavParent;
          if (navImport) {
            hasNavParent = node.parent
                && node.parent.openingElement.name.name === navImport.local.name
                && node.parent.children.filter(child => child.type === 'JSXElement').length === 1;
          }

          if (variantAttr) {
            if (variantAttr.value !== null) {
              context.report({
                node,
                message: `variant has been removed from ${node.openingElement.name.name}, use <${navImportName} ${variantVal}> instead`,
                fix(fixer) {
                  const fixes = [fixer.replaceText(variantAttr, '')];
                  if (hasNavParent) {
                    fixes.push(fixer.insertTextAfter(node.parent.openingElement.name, ' ' + variantVal))
                  }
                  return fixes;
                }
              });
            } else {
              context.report({
                node,
                message: `variant has been removed from ${node.openingElement.name.name}, use <${navImportName} variant={"horizontal" | "default" | "tertiary"}> instead`,
                fix(fixer) {
                  const fixes = [fixer.replaceText(variantAttr, '')];
                  return fixes;
                }
              });
            }
          }
        }
      }
    }
  }
}
