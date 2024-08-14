import { ImportSpecifier, JSXOpeningElement } from "estree-jsx";

/** Resolves the imported name of a node, even if that node has an aliased local name */
export function getImportedName(
  namedImports: ImportSpecifier[],
  node: JSXOpeningElement
) {
  if (node.name.type !== "JSXIdentifier") {
    return;
  }

  const nodeName = node.name.name;

  const nodeImport = namedImports.find((imp) => imp.local.name === nodeName);

  return nodeImport?.imported.name;
}
