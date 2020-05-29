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
            sourceCode.getTokens(node).forEach(token => {
              // console.log('currentToken: ',token.value);
              let removeFollowingComma = false;
              let aliasRemoveFollowingComma = false;
              let hasImportAlias = false; // i.e: NavVariants as MyThing 
              let removePreviousComma = false;
              const tokenText = sourceCode.getText(token);
              const previousToken = sourceCode.getTokenBefore(token);
              const previousTokenText = sourceCode.getText(previousToken);
              const nextToken = sourceCode.getTokenAfter(token);
              const nextTokenText = sourceCode.getText(nextToken);
              // console.log('nextToken: ',sourceCode.getText(nextToken))
              // console.log('previousToken: ',sourceCode.getText(previousToken));
              if (nextTokenText === ',') {
                removeFollowingComma = true;
              } else if (nextTokenText === '}' && previousTokenText === ',') {
                removePreviousComma = true;
              } else if (nextTokenText === 'as') {
                hasImportAlias = true;
                const whatFollowsAlias = sourceCode.getTokensAfter(token, {
                  count: 3
                });
                if (sourceCode.getText(whatFollowsAlias[whatFollowsAlias.length - 1]) === ',') {
                  aliasRemoveFollowingComma = true;
                } else if (sourceCode.getText(whatFollowsAlias[whatFollowsAlias.length - 1]) === '}' && previousTokenText === ',') {
                  removePreviousComma = true;
                }
              }
              context.report({
                node, 
                message: `cellHeightAuto transformer has been deprecated, removed usage`, 
                fix(fixer) {
                  const fixes = [
                    fixer.remove(token)
                  ];
                  // console.log('remove1: ', token);
                  if (removePreviousComma) {
                    fixes.push(fixer.remove(previousToken));
                    // console.log('remove2: ', previousToken);
                  }
                  if (hasImportAlias) {
                    let additionalTokensToRemove;
                    if (aliasRemoveFollowingComma) {
                      // We have something like `NavVariants as MyVariants,` with a comma at the end 
                      additionalTokensToRemove = sourceCode.getTokensAfter(token, {
                        count: 3
                      });
                    } else {
                      // Without a comma
                      additionalTokensToRemove = sourceCode.getTokensAfter(token, {
                        count: 2
                      });
                    }
                    additionalTokensToRemove.forEach(additionalToken => fixes.push(fixer.remove(additionalToken)));
                    // console.log('remove4: ', additionalToken);
                  } else if (removeFollowingComma) {
                    fixes.push(fixer.remove(nextToken));
                    // console.log('remove5: ', nextToken);
                  }
                  return fixes;
                }
              });
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
