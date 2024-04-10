import { Rule } from 'eslint';
import { ImportDeclaration } from 'estree-jsx';

export function getImportDeclarations(
  context: Rule.RuleContext,
  packageName: string
) {
  const astBody = context.getSourceCode().ast.body;

  const importDeclarationsFromPackage = astBody.filter(
    (node) =>
      node.type === 'ImportDeclaration' && node.source.value === packageName
  ) as ImportDeclaration[];

  return importDeclarationsFromPackage;
}
