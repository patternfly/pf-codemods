const { getPackageImports } = require('../helpers');

// https://github.com/patternfly/patternfly-react/pull/4112
module.exports = {
  create: function(context) {
    const imports = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => ['DropdownItem', 'DropdownItemIcon'].includes(specifier.imported.name));
    const dropdownItemImport = imports.find(imp => imp.imported.name === 'DropdownItem');
    const dropdownItemIconImport = imports.find(imp => imp.imported.name === 'DropdownItemIcon');
  
    return !imports ? {} : {
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
          const variant = node.openingElement.attributes.find(attr => attr.name.name === 'variant');
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
