const { getPackageImports } = require('../helpers');

// https://github.com/patternfly/patternfly-react/pull/4225
module.exports = {
  create: function(context) {
    const imports = getPackageImports(context, '@patternfly/react-core')
        .filter(specifier => ['NavList', 'Nav'].includes(specifier.imported.name));
    const navImport = imports.find(imp => imp.imported.name === 'Nav');
    const NavListImport = imports.find(imp => imp.imported.name === 'NavList');

    return !navImport || !NavListImport ? {} : {
      JSXElement(node) {
        if (NavListImport.local.name === node.openingElement.name.name) {
          const hasNavParent = node.parent
              && node.parent.openingElement.name.name === navImport.local.name
              && node.parent.children.filter(child => child.type === 'JSXElement').length === 1;
          const variantAttr = node.openingElement.attributes.find(attribute => {
              return attribute.name.name === 'variant'
          });

          if (variantAttr && variantAttr.value !== null) {
            const variantVal = context.getSourceCode().getText(variantAttr);
            context.report({
              node,
              message: `variant has been removed from ${node.openingElement.name.name}, use <${navImport.local.name} ${variantVal}> instead`,
              fix(fixer) {
                const fixes = [fixer.replaceText(variantAttr, '')];
                if(hasNavParent) {
                  fixes.push(fixer.insertTextAfter(node.parent.openingElement.name, ' ' + variantVal))
                }
                return fixes;
              }
            });
          }
        }
      }
    };
  }
};
