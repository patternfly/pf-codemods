const { getPackageImports } = require('../helpers');

// https://github.com/patternfly/patternfly-react/pull/4225
module.exports = {
  meta: {
    messages: {
      removeNavListVariant: "variant has been removed from {{ navListName }}, use <{{ navName }} {{ variantVal }}> instead",
      removeNavListSimpleVariant: "variant has been removed from NavList and 'simple' is no longer a valid value.",
    },
    fixable: "code",
    schema: []
  },
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
              if (variantAttr.value.value == "simple") {
                context.report({
                  node,
                  messageId: "removeNavListSimpleVariant",
                  fix(fixer) {
                    const fixes = [];
                    fixes.push(fixer.replaceText(variantAttr, ''));
                    return fixes;
                  }
                });
              } else {
                context.report({
                  node,
                  messageId: "removeNavListVariant",
                  data: {
                    navListName: node.openingElement.name.name,
                    navName: navImportName,
                    variantVal: variantVal
                  },
                  fix(fixer) {
                    const fixes = [];
                    if (hasNavParent) {
                      fixes.push(fixer.replaceText(variantAttr, ''));
                      fixes.push(fixer.insertTextAfter(node.parent.openingElement.name, ' ' + variantVal))
                    } else {
                      if (variantAttr.value.value == "default") {
                        fixes.push(fixer.replaceText(variantAttr, ''));
                      } else {
                        fixes.push(fixer.replaceText(variantAttr, `/*TODO: move to Nav - ${variantVal}*/`));
                      }
                    }
                    return fixes;
                  }
                });
              }
            } else {
                context.report({
                  node,
                  messageId: "removeNavListVariant",
                  data: {
                    navListName: node.openingElement.name.name,
                    navName: navImportName,
                    variantVal: 'variant={"horizontal" | "default" | "tertiary"}'
                  },
                  fix(fixer) {
                    const fixes = [];
                    fixes.push(fixer.replaceText(variantAttr, ''));
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
