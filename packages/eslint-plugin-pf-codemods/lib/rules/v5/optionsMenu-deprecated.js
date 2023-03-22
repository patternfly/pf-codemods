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
              ? fixer.insertTextAfter(
                  deprecatedImportDeclaration.specifiers.pop(),
                  `, ${optionsMenuImportsString}`
                )
              : fixer.insertTextAfter(
                  lastImportDeclaration,
                  `\nimport { ${optionsMenuImportsString} } from '@patternfly/react-core/deprecated';`
                ),
              ...optionsMenuImports.map( node => {
                const before = context.getTokenBefore(node);
                // checking against local as coming from the right, alias will show up first if exists and we want to recognize that
                const isImportBeforeFixed = optionsMenuImports.map(n => n.local?.name).includes(context.getTokenBefore(before)?.value);
                const after = context.getTokenAfter(node);
                let isRemainingImportsFixed = true;
                for(let n = after; n.value !== "}"; n = context.getTokenAfter(n)) {
                  if( n.type !== "Punctuator" && !optionsMenuImportNameList.includes(n.value) ) {
                    isRemainingImportsFixed = false;
                    break;
                  }
                }
                let range = node.range;
                if (after.value === ',') {
                  range[1] = context.getTokenAfter(after).range[0];
                } 
                if (isRemainingImportsFixed && before.value === ',' && !isImportBeforeFixed) {
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
  