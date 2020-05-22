const { getPackageImports } = require('../helpers');

// https://github.com/patternfly/patternfly-react/pull/YOURNUMBERHERE
module.exports = {
  create: function(context) {
    const imports = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => ['ChipGroupToolbarItem', 'ChipGroup'].includes(specifier.imported.name));
    const chipGroupImport = imports.find(imp => imp.imported.name === 'ChipGroup');
    const chipGroupToolbarItemImport = imports.find(imp => imp.imported.name === 'ChipGroupToolbarItem');

    return !chipGroupImport ? {} : {
      JSXElement(node) {
        if (chipGroupToolbarItemImport.local.name === node.openingElement.name.name) {
          const hasSingleChipGroupParent = node.parent
            && node.parent.openingElement.name.name === chipGroupImport.local.name
            && node.parent.children.filter(child => child.type === 'JSXElement').length === 1;
          context.report({
            node,
            message: `${node.openingElement.name.name} has been removed, move its props up to parent ${chipGroupImport.local.name}`,
            fix(fixer) {
              const childText = node.children
                .map(child => context.getSourceCode().getText(child))
                .join('');
              const fixes = [
                fixer.replaceText(node, childText),
              ];
              if (hasSingleChipGroupParent) {
                const attributes = node.openingElement.attributes
                  .map(attr => `${attr.name.name}=${attr.value.raw}`)
                  .join(' ');
                fixes.push(fixer.insertsTextAfter(node.parent.openingElement.name, ' ' + attributes))
              }
              return fixes;
            }
          });
        }
      }
    };
  }
};
