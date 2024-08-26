import { ImportSpecifier } from "estree-jsx";
import { getSpecifierFromImports } from "./getSpecifierFromImports";

/** Resolves the local name of an import */
export function getLocalComponentName(
  namedImports: ImportSpecifier[],
  importedName: string
) {
  const componentImport = getSpecifierFromImports(namedImports, importedName);
  const isAlias =
    componentImport?.imported.name !== componentImport?.local.name;

  if (componentImport && isAlias) {
    return componentImport.local.name;
  }

  return importedName;
}
