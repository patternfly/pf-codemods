const { getFromPackage } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/4225
module.exports = {
  meta: {
    messages: {
      removeNavListVariant: "variant has been removed from {{ navListName }}, use <Nav {{ variantVal }}> instead",
      removeNavListSimpleVariant: "variant has been removed from NavList and 'simple' is no longer a valid value.",
    },
    fixable: "code",
    schema: []
  },
  create: function(context) {
    const imports = getFromPackage(
      context,
      "@patternfly/react-core"
    ).imports.filter((specifier) =>
      ["NavList", "Nav"].includes(specifier.imported.name)
    );
    const navImport = imports.find(imp => imp.imported.name === 'Nav');
    const navListImport = imports.find(imp => imp.imported.name === 'NavList');

    return !navListImport ? {} : {
      JSXElement(node) {
        if (navListImport.local.name === node.openingElement.name.name) {
          const variantAttr = node.openingElement.attributes.find(attribute => attribute.name.name === 'variant');

          if (!variantAttr) {
            return;
          }

          if (variantAttr.value === null) {
            context.report({
              node,
              messageId: "removeNavListVariant",
              data: {
                navListName: node.openingElement.name.name,
                variantVal: 'variant={"horizontal" | "default" | "tertiary"}'
              },
              fix(fixer) {
                const fixes = [];
                fixes.push(fixer.replaceText(variantAttr, ''));
                return fixes;
              }
            });
            return;
          }

          if (variantAttr.value.value === "simple") {
            context.report({
              node,
              messageId: "removeNavListSimpleVariant",
              fix(fixer) {
                const fixes = [];
                fixes.push(fixer.replaceText(variantAttr, ''));
                return fixes;
              }
            });
            return;
          }

          const variantVal = variantAttr.value.expression && variantAttr.value.expression.object.name === 'NavListVariants'
            ? `variant="${variantAttr.value.expression.property.name}"`
            : context.getSourceCode().getText(variantAttr);
          context.report({
            node,
            messageId: "removeNavListVariant",
            data: {
              navListName: node.openingElement.name.name,
              variantVal
            },
            fix(fixer) {
              const fixes = [];
              if (
                navImport
                && node.parent
                && node.parent.openingElement.name.name === navImport.local.name
                && node.parent.children.filter(child => child.type === 'JSXElement').length === 1
              ) {
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
      }
    }
  }
}
