import { ImportSpecifier } from "estree-jsx";
import { ImportDefaultSpecifierWithParent } from "./interfaces";
import { getDefaultDeclarationString } from "./getDefaultDeclarationString";

/** Gets the name of an import based on the specifier and an array of names that should be looked for in default import paths */
export function getComponentImportName(
  importSpecifier: ImportSpecifier | ImportDefaultSpecifierWithParent,
  potentialNames: string[]
) {
  if (importSpecifier.type === "ImportSpecifier") {
    return importSpecifier.imported.name;
  }

  return potentialNames.find((name) =>
    getDefaultDeclarationString(importSpecifier)?.includes(name)
  );
}
