const { getPackageImports } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/YOURNUMBERHERE
module.exports = {
  meta: { fixable: 'code' },
  create: function(context) {
    const imports = getPackageImports(context, '@patternfly/react-icons')
      .filter(specifier => specifier.imported.name === 'OutlinedFontAwesomeLogoFullIcon');

    const fortAwesomeImports = getPackageImports(context, '@fortawesome/free-regular-svg-icons');
    const importStatement = `import { fontAwesomeLogoFull } from '@fortawesome/free-regular-svg-icons';`
    if (imports.length) {
      if (fortAwesomeImports.length === 0) {
        const lastImportNode = context.getSourceCode().ast.body
          .filter(node => node.type === 'ImportDeclaration')
          .pop();
        context.report({
          node: lastImportNode,
          message: `add missing ${importStatement}`,
          fix(fixer) {
            return fixer.insertTextAfter(lastImportNode, '\n' + importStatement)
          }
        });
      } else {
        const hasFontAwesomeLogoFullImport = fortAwesomeImports.find(imp => imp.imported.name === 'fontAwesomeLogoFull');
        if (!hasFontAwesomeLogoFullImport) {
          const lastImportedIcon = fortAwesomeImports[fortAwesomeImports.length - 1];
          context.report({
            node: lastImportedIcon.parent,
            message: `add missing ${importStatement}`,
            fix(fixer) {
              return fixer.insertTextAfter(lastImportedIcon, ', fontAwesomeLogoFull');
            }
          });
        }
      }
    }
      
    return imports.length == 0 ? {} : {
      ImportSpecifier(node) {
        if (imports.map(imp => imp.local.name).includes(node.local.name)) {

          const sourceCode = context.getSourceCode();
          const previousToken = sourceCode.getTokenBefore(node);
          const previousTokenText = sourceCode.getText(previousToken);
          const lastNodeToken = sourceCode.getLastToken(node);
          const nextToken = sourceCode.getTokenAfter(lastNodeToken);
          const nextTokenText = sourceCode.getText(nextToken);
          context.report({
            node, 
            message: `Removed OutlinedFontAwesomeLogoFullIcon. Import it from @FortAwesome instead.`, 
            fix(fixer) {
              const fixes = [
                fixer.remove(node)
              ];
              if (nextTokenText === '}' && previousTokenText === ',') {
                // it's the last item but has a preceding item, clean up previous comma
                fixes.push(fixer.remove(previousToken));
              }
              if (nextTokenText === ',') {
                fixes.push(fixer.remove(nextToken));
              }
              return fixes;
            }
          })
        }
      }
    };
  }
};
