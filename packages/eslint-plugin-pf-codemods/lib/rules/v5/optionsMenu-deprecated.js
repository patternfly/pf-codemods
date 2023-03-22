// https://github.com/patternfly/patternfly-react/pull/8798
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    return {
      ImportDeclaration(node) {
        const optionsMenuImports = node.specifiers.filter(
          (specifier) => (node.source.value === "@patternfly/react-core" &&
            /^OptionsMenu\w*$/.test(specifier.imported?.name)
          )
        );
        if (!optionsMenuImports.length) return {};

        const allImportDeclarations = context.getSourceCode().ast.body.filter(node => node.type === 'ImportDeclaration');
        const deprecatedImportDeclaration = allImportDeclarations.find(node => node.source.value === "@patternfly/react-core/deprecated");
        const lastImportDeclaration = allImportDeclarations.pop();
        const optionsMenuImportNameList = optionsMenuImports.map(n => n.imported.name);
        const optionsMenuImportsString = optionsMenuImports.map(n => context.getSourceCode().getText(n)).join(', ');
        context.report({
          node,
          message: `OptionsMenu has been deprecated. Your import has been updated, but we suggest replacing it with the Select component.`,
          fix(fixer) {
            return [
              deprecatedImportDeclaration
              ? {}
              : fixer.insertTextAfter(
                  lastImportDeclaration,
                  `\nimport { ${optionsMenuImportsString} } from '@patternfly/react-core/deprecated';`
                ),
              ...optionsMenuImports.map( node => {
                const before = context.getTokenBefore(node);
                const isImportBeforeFixed = optionsMenuImports.map(n => n.imported?.name).includes(context.getTokenBefore(before)?.value);
                const after = context.getTokenAfter(node);
                let isRemainingImportsFixed = true;
                for(let n = after; n.value !== "}"; n = context.getTokenAfter(n)) {
                  console.log( {
                    'node': node.imported.name,
                    'ntype': n.type,
                    'nval': n.value
                  })
                  if( n.type !== "Punctuator" && !optionsMenuImportNameList.includes(n.value) ) {
                    console.log("FALSE");
                    isRemainingImportsFixed = false;
                    break;
                  }
                }
                let range = node.range;
                console.log({
                  'node': node.imported.name, after, before, isImportBeforeFixed, isRemainingImportsFixed
                })
                if (after.value === ',') {
                  console.log('also remove token after');
                  range[1] = context.getTokenAfter(after).range[0];

                } 
                if (isRemainingImportsFixed && before.value === ',' && !isImportBeforeFixed) {
                  console.log('also remove token before');
                  range[0] = context.getTokenBefore(before).range[1];
                }
                return fixer.replaceTextRange(range, '');
              })
            ];
          }
        });
      },
    };
  },
};
  