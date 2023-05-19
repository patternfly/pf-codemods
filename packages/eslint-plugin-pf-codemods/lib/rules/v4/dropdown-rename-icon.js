const { getFromPackage } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/4112
module.exports = {
  meta: { fixable: 'code' },
  create: function(context) {
    const imports = getFromPackage(
      context,
      "@patternfly/react-core"
    ).imports.filter((specifier) =>
      ["DropdownItem", "DropdownItemIcon"].includes(specifier.imported.name)
    );
    const dropdownItemImport = imports.find(imp => imp.imported.name === 'DropdownItem');
    const dropdownItemIconImport = imports.find(imp => imp.imported.name === 'DropdownItemIcon');
  
    return !dropdownItemImport || !dropdownItemIconImport ? {} : {
      JSXElement(node) {
        if (dropdownItemImport.local.name === node.openingElement.name.name) {
          const dropdownIcons = node.children.filter(child =>
            child.openingElement &&
            child.openingElement.name.name === dropdownItemIconImport.local.name
          );
          const childText = dropdownIcons.length === 1 && dropdownIcons[0].children
              .map(child => context.getSourceCode().getText(child))
              .join('')
              .trim();
          const variant = node.openingElement.attributes.find(attr => attr.name && attr.name.name === 'variant');
          if (variant || childText) {
            context.report({
              node,
              message: `variant="icon" has been removed from ${node.openingElement.name.name}, use icon={${childText || '<Icon />'}} instead`,
              fix(fixer) {
                const fixes = [];
                if (childText) {
                  fixes.push(fixer.replaceText(dropdownIcons[0], ''));
                  fixes.push(fixer.insertTextAfter(node.openingElement.name, ` icon={${childText}}`));
                }
                if (variant) {
                  fixes.push(fixer.replaceText(variant, ''));
                }
                return fixes;
              }
            });
          }
        }
      },
    };
  }
};
