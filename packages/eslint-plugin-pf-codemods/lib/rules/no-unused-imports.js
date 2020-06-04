// Cleanup from other rules
module.exports = {
  create: function(context) {
    const allTokens = context.getSourceCode().ast.body
      .filter(node => node.type !== 'ImportDeclaration')
      .map(node => context.getSourceCode().getTokens(node).map(token => token.value))
      .reduce((acc, val) => acc.concat(val), []);

    return {
      ImportDeclaration(node) {
        // We should visit all nodes in the AST like eslint/lib/rules/no-unused-vars
        // and add typescript nodes like @typescript-eslint/eslint-plugin/lib/rules/no-unused-vars
        // ... but let's cheat and string compare to all tokens in the source file instead.
        if (/@patternfly\/react/.test(node.source.value)) {
          node.specifiers
            .filter(spec => !allTokens.includes(spec.local.name))
            .forEach(spec => context.report({
                node,
                message: `unused patternfly import ${spec.local.name}`,
                fix(fixer) {
                  const fixes = [fixer.remove(spec)];
                  const prevToken = context.getSourceCode().getTokenBefore(spec);
                  if (prevToken && prevToken.value === ',') {
                    fixes.push(fixer.remove(prevToken));
                  }
                  return fixes;
                }
              })
            );
        }
      }
    };
  }
};