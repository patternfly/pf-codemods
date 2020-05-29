const removedImports = [
  'NavVariants', // Use the variant prop on the Nav component with one of these values: 'default' | 'horizontal' | 'tertiary'
  'CardHead', // See card-rename-components rule for more info
  'CardHeadMain', // See card-rename-components rule for more info
  'BackgroundImgSrc', // See background-image-src-enum rule for more info
  'ChipButton', // See chipgroup-remove-chipbutton rule for more info
  'ChipGroupToolbarItem', // See chipgroup-remove-chipgrouptoolbaritem rule for more info,
  'cellHeightAuto' // See table-removed-transforms rule for more info
];

// https://github.com/patternfly/pf-codemods/issues/39
module.exports = {
  create: function(context) {
    // return {};
    return {
      ImportDeclaration(node) {
        const sourceCode = context.getSourceCode();
        // console.log(context.getSourceCode().getTokens(node));
        if (/\@patternfly\/react-(core|table)/.test(node.source.value)) {
          context.getSourceCode().getTokens(node).forEach(token => {
            let removeFollowingComma = false;
            let aliasRemoveFollowingComma = false;
            let hasImportAlias = false; // i.e: NavVariants as MyThing
            let removePreviousComma = false;
            const tokenText = sourceCode.getText(token);
            if (removedImports.includes(tokenText)) {
              const previousToken = sourceCode.getTokenBefore(token);
              const nextToken = sourceCode.getTokenAfter(token);
              if (sourceCode.getText(nextToken) === ',') {
                removeFollowingComma = true;
              } else if (sourceCode.getText(nextToken) === '}' && sourceCode.getText(previousToken) === ',') {
                removePreviousComma = true;
              } else if (sourceCode.getText(nextToken) === 'as') {
                hasImportAlias = true;
                const whatFollowsAlias = sourceCode.getTokensAfter(token, {
                  count: 3
                });
                if (sourceCode.getText(whatFollowsAlias[whatFollowsAlias.length - 1]) === ',') {
                  aliasRemoveFollowingComma = true;
                } else if (sourceCode.getText(whatFollowsAlias[whatFollowsAlias.length - 1]) === '}' && sourceCode.getText(previousToken) === ',') {
                  removePreviousComma = true;
                }
              }
              context.report({
                  node,
                  message: `${tokenText} was removed`,
                  fix(fixer) {
                    const fixes = [
                      fixer.remove(token)
                    ];
                    if (removePreviousComma) {
                      fixes.push(fixer.remove(previousToken));
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
                    } else if (removeFollowingComma) {
                      fixes.push(fixer.remove(nextToken));
                    }
                    return fixes;
                  }
                });
            }
          });
        }
      }
    };
  }
};
