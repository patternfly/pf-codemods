import { ImportDeclaration, ImportSpecifier } from "estree-jsx";
import { pfPackageMatches } from "../pfPackageMatches";
import { ImportDefaultSpecifierWithParent } from "../interfaces";

function checkSpecifierExists(
  node: ImportDeclaration,
  importSpecifier: ImportSpecifier | ImportDefaultSpecifierWithParent
) {
  return node.specifiers.some(
    (specifier) =>
      (specifier.type === "ImportSpecifier" &&
        specifier.imported.name ===
          (importSpecifier as ImportSpecifier).imported.name) ||
      (specifier.type === "ImportDefaultSpecifier" &&
        specifier.local.name === importSpecifier.local.name)
  );
}

/**
 * Use inline at the start of an ImportDeclaration block to early return if no specifiers are found, or only run logic if at least 1 specifier is found.
 * @param node - The node to check for any import specifiers.
 * @param imports - A single import specifier or an array of specifiers to find within the import declaration.
 * @param packageName - The package name to check against the import declaration source.
 * @returns A boolean depending on whether the import declaration source matches the packageName, or whether at least 1 import specifier is found.
 */
export function checkMatchingImportDeclaration(
  node: ImportDeclaration,
  imports:
    | ImportSpecifier
    | ImportDefaultSpecifierWithParent
    | (ImportSpecifier | ImportDefaultSpecifierWithParent)[],
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
