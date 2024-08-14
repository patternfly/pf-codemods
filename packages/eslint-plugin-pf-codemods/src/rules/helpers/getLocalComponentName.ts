import { ImportSpecifier } from "estree-jsx";

/** Resolves the local name of an import */
export function getLocalComponentName(
  namedImports: ImportSpecifier[],
  importedName: string
) {
  const componentImport = namedImports.find(
    (name) => name.imported.name === importedName
  );

  const isAlias =
    componentImport?.imported.name !== componentImport?.local.name;

  if (componentImport && isAlias) {
    return componentImport.local.name;
  }

  return importedName;
}
