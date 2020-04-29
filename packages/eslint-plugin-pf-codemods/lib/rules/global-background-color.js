// https://github.com/patternfly/patternfly-react/pull/4014
module.exports = {
  create: function(context) {
    return {
      ImportDeclaration(node) {
        if (node.source.value === '@patternfly/react-tokens') {
          node.specifiers
            .filter(specifier => ['global_background_color_150', 'global_background_color_300'].includes(specifier.imported.name))
            .forEach(specifier => {
              context.report({
                node,
                message: `${specifier.imported.name} has been removed. Consider using global_BackgroundColor_200 with its new value #f0f0f0 instead`,
                fix(fixer) {
                  return fixer.replaceText(specifier, `global_background_color_200 as ${specifier.imported.name}`);
                }
              });
            });
        }
      }
    };
  }
};