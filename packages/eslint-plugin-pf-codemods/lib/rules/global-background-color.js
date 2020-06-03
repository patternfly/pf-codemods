// https://github.com/patternfly/patternfly-react/pull/4014
module.exports = {
  create: function(context) {
    return {
      ImportDeclaration(node) {
        if (node.source.value === '@patternfly/react-tokens') {
          node.specifiers
            .filter(specifier => ['global_BackgroundColor_150', 'global_BackgroundColor_300'].includes(specifier.imported.name))
            .forEach(specifier => {
              const importedName = specifier.imported.name;
              const localName = specifier.local.name;
              const isAliased = importedName !== localName;
              const aliasText = isAliased ? ` as ${localName}` : ` as ${importedName}`;
              const newName = `global_BackgroundColor_200${aliasText}`;
              context.report({
                node,
                message: `${specifier.imported.name} has been removed. Consider using global_BackgroundColor_200 with its new value #f0f0f0 instead`,
                fix(fixer) {
                  return fixer.replaceText(specifier, newName);
                }
              });
            });
        }
      }
    };
  }
};