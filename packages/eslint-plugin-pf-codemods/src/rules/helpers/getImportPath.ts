import {
  ImportDefaultSpecifierWithParent,
  ImportSpecifierWithParent,
} from "./interfaces";

/** Gets the import path string for an import specifier (named or default) */
export function getImportPath(
  importSpecifier: ImportDefaultSpecifierWithParent | ImportSpecifierWithParent
) {
  return importSpecifier?.parent?.source.value?.toString();
}
