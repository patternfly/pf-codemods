const { getPackageImports } = require('../helpers');

// https://github.com/patternfly/patternfly-react/pull/4170
module.exports = {
  create: function(context) {
    const tableImports = getPackageImports(context, '@patternfly/react-table');
    
    if (tableImports.length) {
      const cellWidthImport = tableImports.filter(specifier => specifier.imported.name === 'cellWidth');
      const cellHeightAutoImport = tableImports.filter(specifier => specifier.imported.name === 'cellHeightAuto');
      const hasCellWidthImport = cellWidthImport.length;
      const hasCellHeightAutoImport = cellHeightAutoImport.length;

      return (hasCellWidthImport || hasCellHeightAutoImport) ? {} : {
        Property(node) {
          const transforms = node.key.name === 'transforms' &&
            node.value.type === 'ArrayExpression' &&
            node;
          const transformsArr = transforms.value && transforms.value.elements;
          if (!transformsArr) {
            return; 
          }

          if (hasCellWidthImport) {
            const cellWidthCallExpressions = transformsArr.filter(transform => transform.callee && transform.callee.name && 
              transform.callee.name === 'cellWidth');
            const cellWidthMaxNodes = cellWidthCallExpressions
              .map(expression => expression.arguments)
              .flat()
              .filter(arg => arg.value === 'max');
            if (cellWidthMaxNodes.length) {
              cellWidthMaxNodes.map(maxNode => {
                context.report({
                  node, 
                  message: `cellWidth('max') has been replaced with cellWidth(100)`, 
                  fix(fixer) {
                    return fixer.replaceText(maxNode, '100');
                  }
                });
              });
            }
          }

          if (hasCellHeightAutoImport) {
            const cellHeightAutoImportStatements = context.getSourceCode().ast.body
              .filter(node => node.type === 'ImportDeclaration')
              .filter(node => node.source.value === '@patternfly/react-table')
              .filter(node => node.specifiers.some(specifier => specifier.imported.name === 'cellHeightAuto'));
            if (cellHeightAutoImportStatements.length) {
              cellHeightAutoImportStatements.map(importStatement => {
                const importStatementText = context.getSourceCode().getText(importStatement);
                const newText = importStatementText
                .split(',')
                .filter(str => str.trim() !== 'cellHeightAuto')
                .join(',');
                context.report({
                  node,
                  message: `cellHeightAuto transformer has been deprecated`, 
                  fix(fixer) {
                    return fixer.replaceText(importStatement, newText);
                  }
                });
              });
            }
            
            const cellHeightAutoNode = transformsArr.find(transform => transform.callee && transform.callee.name && 
              transform.callee.name === 'cellHeightAuto');
            if (cellHeightAutoNode) {
              const transformsText = context.getSourceCode().getText(transforms);
              const newText = transformsText
                .split(',')
                .filter(str => str.trim() !== 'cellHeightAuto()')
                .join(','); 
              context.report({
                node,
                message: `cellHeightAuto transformer has been deprecated`, 
                fix(fixer) {
                  return fixer.replaceText(transforms, newText);
                }
              });
            }
          }
        }
      }
    }
  }
};
