const { getPackageImports } = require('../helpers');

// https://github.com/patternfly/patternfly-react/pull/YOURNUMBERHERE
module.exports = {
  create: function(context) {
    const imports = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => specifier.imported.name === 'DataToolbar');
      
    return imports.length === 0 ? {} : {
      // update component's import statement
      ImportSpecifier(node) {
        const importedName = node.imported.name;
	      if (importedName === 'DataToolbar') {
          const localName = node.local.name;
          const isAliased = importedName !== localName;
          const aliasText = isAliased ? ` as ${localName}` : '';
          const newName = `Toolbar${aliasText}`;
          context.report({
            node,
            message: `DataToolbar has been replaced with Toolbar`,
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
          nodeName === 'DataToolbar' &&
          importedNode.imported.name === importedNode.local.name // don't rename an aliased component
        ) {
          const updateTagName = node => context
          	.getSourceCode()
          	.getText(node)
          	.replace(nodeName, 'Toolbar');
          const isOpeningTag = context.getSourceCode().getTokenBefore(node).value !== '/';
          const newOpeningParentTag = `${updateTagName(node.parent).slice(0, -1)} data-codemods="true">`;
          const newClosingTag = updateTagName(node);
          context.report({
            node,
            message: `DataToolbar has been replaced with Toolbar`,
            fix(fixer) {
              const fixes = [
                isOpeningTag
                ? fixer.replaceText(node.parent, newOpeningParentTag)
                : fixer.replaceText(node, newClosingTag)
              ];
              return fixes;
            }
          });
        }
      }
    };
  }
}
