const { getPackageImports } = require('../helpers');

// https://github.com/patternfly/patternfly-react/pull/4170
module.exports = {
  create: function(context) {
    const tableImports = getPackageImports(context, '@patternfly/react-table');
    const cellWidthImport = tableImports.filter(specifier => specifier.imported.name === 'cellWidth');
    const cellHeightAutoImport = tableImports.filter(specifier => specifier.imported.name === 'cellHeightAuto');
    
    return (!cellWidthImport.length && !cellHeightAutoImport.length) ? {} : {
      CallExpression(node) {
        const maxNode = node.callee.name && 
          node.callee.name === 'cellWidth' &&
          node.arguments.find(arg => arg.value === 'max');
        if (maxNode && cellWidthImport.length) {
    context.report({
            node, 
            message: `cellWidth('max') has been replaced with cellWidth(100)`, 
            fix(fixer) {
              return fixer.replaceText(maxNode, '100');
            }
          });
        }

        const isCellHeightAutoNode = node.callee.name && node.callee.name === 'cellHeightAuto';
        if (isCellHeightAutoNode && cellHeightAutoImport.length) {
          const sourceCode = context.getSourceCode();
          const previousToken = sourceCode.getTokenBefore(node);
          const previousTokenText = sourceCode.getText(previousToken);
          const lastNodeToken = sourceCode.getLastToken(node);
          const nextToken = sourceCode.getTokenAfter(lastNodeToken);
          const nextTokenText = sourceCode.getText(nextToken);
          context.report({
            node, 
            message: `cellHeightAuto has been deprecated, remove usage`, 
            fix(fixer) {
              const fixes = [
                fixer.remove(node)
              ];
              if (nextTokenText === ']' && previousTokenText === ',') {
                // it's the last item but has a preceding item, clean up previous comma
                fixes.push(fixer.remove(previousToken));
              }
              if (nextTokenText === ',') {
                fixes.push(fixer.remove(nextToken));
              }
              return fixes;
            }
          });
        }
      }
    }
  }
};
