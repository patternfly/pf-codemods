import { Rule } from "eslint";
import {
  ImportDeclaration,
  ExportNamedDeclaration,
  Directive,
  Statement,
  ModuleDeclaration,
} from "estree-jsx";

function filterByDeclarationType(
  astBody: (Directive | Statement | ModuleDeclaration)[],
  nodeType: "ImportDeclaration" | "ExportNamedDeclaration",
  packageName?: string | RegExp
) {
  return astBody.filter(
    (node) =>
      node.type === nodeType &&
      (packageName ? node.source?.value === packageName : true)
  );
}

export function getAllImportDeclarations(
  context: Rule.RuleContext,
  packageName?: string
) {
  const astBody = context.getSourceCode().ast.body;

  const importDeclarationsFromPackage = filterByDeclarationType(
    astBody,
    "ImportDeclaration",
    packageName
  ) as ImportDeclaration[];

  return importDeclarationsFromPackage;
}
