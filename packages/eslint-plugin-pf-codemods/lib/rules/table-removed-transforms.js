const { getPackageImports } = require('../helpers');

// https://github.com/patternfly/patternfly-react/pull/YOURNUMBERHERE
module.exports = {
  create: function(context) {
    const imports = getPackageImports(context, '@patternfly/react-table')
      .filter(specifier => specifier.imported.name === 'cellWidth');
    
    return !imports ? {} : {
      CallExpression(node) {
        const maxNode = node.callee.name && 
          node.callee.name === 'cellWidth' &&
          node.arguments.find(arg => arg.value === 'max');
        if (!maxNode) {
          return;
        }
        const nodeText = context.getSourceCode().getText(maxNode);
        context.report({
          node, 
          message: `cellWidth(${nodeText}) has been replaced with cellWidth(100)`, 
          fix(fixer) {
            return fixer.replaceText(maxNode, '100');
          }
        });
      }
    }
  }
};

