import { ImportSpecifier, ImportDefaultSpecifier } from "estree-jsx";
import { getSpecifierFromImports } from "./getSpecifierFromImports";

/** Resolves the local name of an import */
export function getLocalComponentName(
  namedImports: (ImportSpecifier | ImportDefaultSpecifier)[],
  importedName: string
) {
  const componentImport = getSpecifierFromImports(namedImports, importedName);
  const isDefaultImport = componentImport?.type === "ImportDefaultSpecifier";
  const isAlias =
    !isDefaultImport &&
    componentImport?.imported.name !== componentImport?.local.name;

  if ((componentImport && isAlias) || isDefaultImport) {
    return componentImport.local.name;
  }

  return importedName;
}
