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
                  fixes.push(fixer.remove(nextTokenText));
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




/*
module.exports = {
  create: function(context) {
    const tableImports = getPackageImports(context, '@patternfly/react-table');
    
    if (tableImports.length) {
      const cellWidthImport = tableImports.filter(specifier => specifier.imported.name === 'cellWidth');
      const cellHeightAutoImport = tableImports.filter(specifier => specifier.imported.name === 'cellHeightAuto');
      const hasCellWidthImport = cellWidthImport.length;
      const hasCellHeightAutoImport = cellHeightAutoImport.length;

      return !(hasCellWidthImport || hasCellHeightAutoImport) ? {} : {
        CallExpression(node) {
          //////// cellWidth('max')
          const maxNode = node.callee.name && 
            node.callee.name === 'cellWidth' &&
            node.arguments.find(arg => arg.value === 'max');
          if (!maxNode) {
            return;
          }
          context.report({
            node, 
            message: `cellWidth('max') has been replaced with cellWidth(100)`, 
            fix(fixer) {
              return fixer.replaceText(maxNode, '100');
            }
          });
          ////////// end cellWidth('max')
          ////////// cellHeightAuto()
          const cellHeightAutoNode = node.callee.name && 
            node.callee.name === 'cellHeightAuto';
          if (!cellHeightAutoNode) {
            return;
          }
          context.report({
            node, 
            message: `cellWidth('max') has been replaced with cellWidth(100)`, 
            fix(fixer) {
              return fixer.remove(node);
            }
          });
          //////////// end cellHeightAuto()
        },

        CallExpression(node) {
          const transforms = node.key.name === 'transforms' &&
            node.value.type === 'ArrayExpression' &&
            node;
          const transformsArr = transforms.value && transforms.value.elements;
          if (!transformsArr) {
            return; 
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
                  .match(/\{([^)]+)\}/)[1] // get imports between { }
                  .split(',')
                  .filter(str => !str.trim().includes('cellHeightAuto'))
                  .join(',');
                context.report({
                  node,
                  message: `cellHeightAuto transformer has been deprecated, import removed`, 
                  fix(fixer) {
                    return fixer.replaceText(importStatement, `import {${newText} } from '@patternfly/react-table';`);
                  }
                });
              });
            }
            
            const cellHeightAutoNode = transformsArr.find(transform => transform.callee && transform.callee.name && 
              transform.callee.name === 'cellHeightAuto');
            if (cellHeightAutoNode) {
              const transformsText = context.getSourceCode().getText(transforms.value).replace('[', '').replace(']', ''); // text between array brackets 
              const newText = transformsText
                .split(',')
                .filter(str => str.trim() !== 'cellHeightAuto()')
                .join(','); 
              context.report({
                node,
                message: `cellHeightAuto transformer has been deprecated, removed usage`, 
                fix(fixer) {
                  return fixer.replaceText(transforms.value, `[${newText}]`);
                }
              });
            }
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
        }
      }
    }
  }
};
*/
