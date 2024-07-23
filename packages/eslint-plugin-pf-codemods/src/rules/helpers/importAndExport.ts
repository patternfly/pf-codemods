import { Rule } from "eslint";
import {
  ImportDeclaration,
  Directive,
  Statement,
  ModuleDeclaration,
} from "estree-jsx";
import { getDefaultImportsFromPackage, getFromPackage } from "./getFromPackage";

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

export function getImportSpecifiersLocalNames(
  context: Rule.RuleContext,
  componentName: string,
  packageName: string = "@patternfly/react-component-groups"
) {
  const { imports } = getFromPackage(context, packageName);

  const componentImportSpecifiers = imports.filter(
    (specifier) => specifier.imported.name === componentName
  );

  const componentImportDefaultSpecifiers = getDefaultImportsFromPackage(
    context,
    packageName,
    componentName
  );

  return [
    ...componentImportSpecifiers.map((imp) => imp.local.name),
    ...componentImportDefaultSpecifiers.map((imp) => imp.local.name),
  ];
}
