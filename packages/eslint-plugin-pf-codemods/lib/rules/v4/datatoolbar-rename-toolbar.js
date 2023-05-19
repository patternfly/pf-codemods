const { getFromPackage } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/4170
module.exports = {
  meta: { fixable: 'code' },
  create: function(context) {
    const imports = getFromPackage(
      context,
      "@patternfly/react-core"
    ).imports.filter((specifier) =>
      [
        "DataToolbar",
        "DataToolbarChipGroupContent",
        "DataToolbarContent",
        "DataToolbarExpandableContent",
        "DataToolbarFilter",
        "DataToolbarGroup",
        "DataToolbarItem",
        "DataToolbarToggleGroup",
      ].includes(specifier.imported.name)
    );
      
    return imports.length === 0 ? {} : {
      // update component's import statement
      ImportSpecifier(node) {
        const importedName = node.imported.name;
	      if (importedName.includes('DataToolbar')) {
          const toolbarName = importedName.replace('DataToolbar', 'Toolbar');
          const localName = node.local.name;
          const isAliased = importedName !== localName;
          const aliasText = isAliased ? ` as ${localName}` : '';
          const newName = `${toolbarName}${aliasText}`;
          context.report({
            node,
            message: `${importedName} has been replaced with ${toolbarName}`,
            fix(fixer) {
              return fixer.replaceText(node, newName);
            }
          });
        }
      },
      // update opening/closing elements 
      JSXIdentifier(node) {
        const nodeName = node.name;
        const importedNode = imports.find(imp => imp.local.name === nodeName);
        if (
          nodeName.includes('DataToolbar') &&
          importedNode.imported.name === importedNode.local.name // don't rename an aliased component
        ) {
          const toolbarName = nodeName.replace('DataToolbar', 'Toolbar');
          const needsDataAttr = ['Toolbar', 'ToolbarGroup', 'ToolbarItem'].includes(toolbarName);
          const addDataAttr = jsxStr => `${jsxStr.slice(0, -1)} data-codemods="true">`;
          const updateTagName = node => context
          	.getSourceCode()
          	.getText(node)
            .replace('DataToolbar', 'Toolbar');
          const isOpeningTag = context.getSourceCode().getTokenBefore(node).value !== '/';
          const newOpeningParentTag = needsDataAttr ? addDataAttr(updateTagName(node.parent)) : updateTagName(node.parent);
          const newClosingTag = updateTagName(node);
          context.report({
            node,
            message: `${nodeName} has been replaced with ${nodeName.replace('DataToolbar', 'Toolbar')}`,
            fix(fixer) {
              return isOpeningTag
                ? fixer.replaceText(node.parent, newOpeningParentTag)
                : fixer.replaceText(node, newClosingTag);
            }
          });
        }
      }
    };
  }
}
