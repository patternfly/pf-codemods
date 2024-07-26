import { JSXOpeningElement, ImportSpecifier } from "estree-jsx";

export function checkMatchingJSXOpeningElement(
  node: JSXOpeningElement,
  imports: ImportSpecifier | ImportSpecifier[]
) {
  if (Array.isArray(imports)) {
    return (
      node.name.type === "JSXIdentifier" &&
      imports.map((imp) => imp.local.name).includes(node.name.name)
    );
  }

  return (
    node.name.type === "JSXIdentifier" && imports.local.name === node.name.name
  );
}
