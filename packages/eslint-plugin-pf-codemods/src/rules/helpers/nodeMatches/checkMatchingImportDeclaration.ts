import { ImportDeclaration, ImportSpecifier } from "estree-jsx";
import { pfPackageMatches } from "../pfPackageMatches";

function checkSpecifierExists(
  node: ImportDeclaration,
  importSpecifier: ImportSpecifier
) {
  return node.specifiers.some(
    (specifier) =>
      specifier.type === "ImportSpecifier" &&
      specifier.imported.name === importSpecifier.imported.name
  );
}

/** Used to check whether the current ImportDeclaration node matches at least 1 of the import specifiers. */
export function checkMatchingImportDeclaration(
  node: ImportDeclaration,
  imports: ImportSpecifier | ImportSpecifier[],
  packageName: string = "@patternfly/react-core"
) {
  if (!pfPackageMatches(packageName, node.source.value)) {
    return false;
  }

  if (Array.isArray(imports)) {
    return imports.some((imp) => checkSpecifierExists(node, imp));
  }

  return checkSpecifierExists(node, imports);
}
