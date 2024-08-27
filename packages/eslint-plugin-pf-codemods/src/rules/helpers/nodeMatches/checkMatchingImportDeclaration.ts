import { ImportDeclaration, ImportSpecifier } from "estree-jsx";
import { pfPackageMatches } from "../pfPackageMatches";

function findSpecifier(
  node: ImportDeclaration,
  imporSpecifier: ImportSpecifier
) {
  return node.specifiers.find(
    (specifier) =>
      specifier.type === "ImportSpecifier" &&
      specifier.imported.name === imporSpecifier.imported.name
  );
}

/** Used to check whether the current ImportDeclaration node matches at least 1 of the import specifiers. */
export function checkMatchingImportDeclaration(
  node: ImportDeclaration,
  imports: ImportSpecifier | ImportSpecifier[],
  exactMatch: boolean = false
) {
  if (!pfPackageMatches("@patternfly/react-core", node.source.value)) {
    return false;
  }

  if (Array.isArray(imports)) {
    return exactMatch
      ? imports.every((imp) => findSpecifier(node, imp))
      : imports.some((imp) => findSpecifier(node, imp));
  }

  return findSpecifier(node, imports);
}
