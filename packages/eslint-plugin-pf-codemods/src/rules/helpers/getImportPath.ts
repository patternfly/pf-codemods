import {
  ImportDefaultSpecifierWithParent,
  ImportSpecifierWithParent,
} from "./interfaces";

/**
 * Use inline to pair with other logic that depends on the import path of a specifier.
 * @param importSpecifier The import specifier object to get the path of.
 * @returns The import path string if found, otherwise undefined.
 */
export function getImportPath(
  importSpecifier: ImportDefaultSpecifierWithParent | ImportSpecifierWithParent
) {
  return importSpecifier?.parent?.source.value?.toString();
}
