import { ImportSpecifier } from "estree-jsx";

/** Used to check whether the current ImportSpecifier node matches at least 1 of the import specifiers. */
export function checkMatchingImportSpecifier(
  node: ImportSpecifier,
  imports: ImportSpecifier | ImportSpecifier[]
) {
  if (Array.isArray(imports)) {
    return imports.some(
      (specifier) => specifier.imported.name === node.imported.name
    );
  }

  return imports.imported.name === node.imported.name;
}
