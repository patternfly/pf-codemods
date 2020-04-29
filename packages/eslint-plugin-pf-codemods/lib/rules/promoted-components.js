const promotedComponents = ['Divider', 'OverflowMenu', 'Drawer'];

// https://github.com/patternfly/patternfly-react/pull/4029
module.exports = {
  create: function(context) {
    return {
      ImportDeclaration(node) {
        if (/\@patternfly\/react-core\/dist\/(esm|js)\/experimental/.test(node.source.value)) {
          node.specifiers
            .filter(specifier => promotedComponents.includes(specifier.imported.name))
            .forEach(specifier => {
              context.report({
                node,
                message: `${specifier.imported.name} has been promoted. Import it directly from @patternfly/react-core instead`,
                fix(fixer) {
                  return fixer.replaceText(node.source, "'@patternfly/react-core'");
                }
              });
            });
        }
      }
    };
  }
};