import { ImportSpecifier } from "estree-jsx";

export function includesImport(
  importSpecifiers: ImportSpecifier[],
  targetImport: string
) {
  return importSpecifiers.some(
    (specifier) => specifier.imported.name === targetImport
  );
}
