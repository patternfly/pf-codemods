const { getFromPackage } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/4246
module.exports = {
  meta: { fixable: 'code' },
  create: function(context) {
    const imports = getFromPackage(
      context,
      "@patternfly/react-core"
    ).imports.filter((specifier) =>
      ["ChipGroupToolbarItem", "ChipGroup"].includes(specifier.imported.name)
    );
    const chipGroupImport = imports.find(imp => imp.imported.name === 'ChipGroup');
    const chipGroupToolbarItemImport = imports.find(imp => imp.imported.name === 'ChipGroupToolbarItem');

    return !chipGroupImport || !chipGroupToolbarItemImport ? {} : {
      JSXElement(node) {
        if (chipGroupToolbarItemImport.local.name === node.openingElement.name.name) {
          const hasSingleChipGroupParent = node.parent
            && node.parent.openingElement
            && node.parent.openingElement.name.name === chipGroupImport.local.name
            && node.parent.children.filter(child => child.type === 'JSXElement').length === 1;
          const report = {
            node,
            message: `${node.openingElement.name.name} has been removed, move its props up to parent ${chipGroupImport.local.name} and remove it`
          };
          if (hasSingleChipGroupParent) {
            const childText = node.children
              .map(child => context.getSourceCode().getText(child))
              .join('');
            const attributes = node.openingElement.attributes
              .map(attr => `${attr.name.name}=${attr.value.raw}`)
              .join(' ');
            report.fix = fixer => [
              fixer.replaceText(node, childText),
              fixer.insertTextAfter(node.parent.openingElement.name, ' ' + attributes)
            ];
          }
          context.report(report);
        }
      }
    };
  }
};
