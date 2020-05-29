const { getPackageImports } = require('../helpers');

// https://github.com/patternfly/patternfly-react/pull/4170
module.exports = {
  create: function(context) {
    const tableImports = getPackageImports(context, '@patternfly/react-table');
    
    if (tableImports.length) {
      const cellWidthImport = tableImports.filter(specifier => specifier.imported.name === 'cellWidth');
      const cellHeightAutoImport = tableImports.filter(specifier => specifier.imported.name === 'cellHeightAuto');
      
      return (!cellWidthImport.length && !cellHeightAutoImport.length) ? {} : {
        CallExpression(node) {
          // console.log('node: ', node.callee.name);
          //////// cellWidth('max')
          const maxNode = node.callee.name && 
            node.callee.name === 'cellWidth' &&
            node.arguments.find(arg => arg.value === 'max');
          if (maxNode) {
			context.report({
              node, 
              message: `cellWidth('max') has been replaced with cellWidth(100)`, 
              fix(fixer) {
                return fixer.replaceText(maxNode, '100');
              }
            });
          }

          ////////// end cellWidth('max')
          ////////// cellHeightAuto() 
          // console.log(node); 
          const isCellHeightAutoNode = node.callee.name && 
            node.callee.name === 'cellHeightAuto';
          if (isCellHeightAutoNode) {
            const sourceCode = context.getSourceCode();
            const previousToken = sourceCode.getTokenBefore(node);
            const previousTokenText = sourceCode.getText(previousToken);
            const lastNodeToken = sourceCode.getLastToken(node);
            const nextToken = sourceCode.getTokenAfter(lastNodeToken);
            const nextTokenText = sourceCode.getText(nextToken);
            console.log('previousToken: ',previousTokenText);
            console.log(`nextToken: ${nextTokenText}`);

            context.report({
              node, 
              message: `cellHeightAuto transformer has been deprecated, removed usage`, 
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
          //////////// end cellHeightAuto()
        }
      }
    }
  }
};
