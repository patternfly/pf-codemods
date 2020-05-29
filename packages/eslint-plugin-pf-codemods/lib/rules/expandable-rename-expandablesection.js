const { getPackageImports } = require('../helpers');

// https://github.com/patternfly/patternfly-react/pull/4116
module.exports = {
  create: function(context) {
    const imports = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => specifier.imported.name === 'Expandable');
    
    return imports.length == 0 ? {} : {
      // update import statement
      ImportSpecifier(node) {
        const importedName = node.imported.name;
	      if (importedName === 'Expandable') {
          const localName = node.local.name;
          const isAliased = importedName !== localName;
          const aliasText = isAliased ? ` as ${localName}` : '';
          context.report({
            node,
            message: 'Expandable has been renamed to ExpandableSection, update import',
            fix(fixer) {
              return fixer.replaceText(node, `ExpandableSection${aliasText}`);
            }
          });
        }
      },
      // update component usage
      JSXElement(node) {
		    const { openingElement, closingElement } = node;
        if (openingElement.name.name === 'Expandable' && closingElement.name.name === 'Expandable') {
          const updateTagName = node => context
          	.getSourceCode()
          	.getText(node)
          	.replace('Expandable', 'ExpandableSection');
          context.report({
          	node,
            message: 'Expandable has been renamed to ExpandableSection, update usage',
            fix(fixer) {
              const fixes = [
                fixer.replaceText(openingElement, updateTagName(openingElement)),
                fixer.replaceText(closingElement, updateTagName(closingElement))
              ];
              return fixes;
            }
          });
        }
      }

    };
  }
};

