// https://github.com/patternfly/patternfly-react/pull/4029
module.exports = {
  meta: { fixable: 'code' },
  create: function(context) {
    return {
      ImportDeclaration(node) {
        if (/\@patternfly\/react-core\/dist\/(esm|js)\/experimental/.test(node.source.value)) {
          context.report({
            node,
            message: `Experimental imports have been removed. Import directly from @patternfly/react-core instead`,
            fix(fixer) {
              return fixer.replaceText(node.source, "'@patternfly/react-core'");
            }
          });
        }
      }
    };
  }
};