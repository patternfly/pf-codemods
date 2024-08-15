import { ImportSpecifier, ImportDefaultSpecifier } from "estree-jsx";

/** Can be used to extract a specific specifier from an array of imports, such as to only
 * run logic if X and Y imports are present or to use the specifier properties in other logic. */
export function getSpecifierFromImports(
  imports: (ImportSpecifier | ImportDefaultSpecifier)[],
  importedName: string
) {
  const importSpecifier = imports.find((imp) =>
    imp.type === "ImportDefaultSpecifier"
      ? imp.local.name === importedName
      : imp.imported.name === importedName
  );

  return importSpecifier;
}
