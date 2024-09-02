import {
  JSXOpeningElement,
  ImportSpecifier,
  ImportDefaultSpecifier,
} from "estree-jsx";

/** Used to check whether the current JSXOpeningElement node matches at least 1 of the import specifiers. */
export function checkMatchingJSXOpeningElement(
  node: JSXOpeningElement,
  imports:
    | ImportSpecifier
    | ImportDefaultSpecifier
    | (ImportSpecifier | ImportDefaultSpecifier)[]
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
