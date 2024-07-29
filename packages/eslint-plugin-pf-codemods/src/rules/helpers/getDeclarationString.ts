import { ImportDefaultSpecifierWithParent } from "./interfaces";

/** Gets the import path string for a default import */
export function getDeclarationString(
  defaultImportSpecifier: ImportDefaultSpecifierWithParent
) {
  return defaultImportSpecifier?.parent?.source.value?.toString();
}
