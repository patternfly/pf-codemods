import {
  JSXOpeningElement,
  ImportSpecifier,
  ImportDefaultSpecifier,
} from "estree-jsx";

/**
 * Use inline at the start of a JSXOpeningElement block to early return if no specifiers match the node name, or only run logic if at least 1 specifier matches the node name.
 * @param node - The node to check for any import specifiers.
 * @param imports - A single import specifier or an array of specifiers to check against the opening element node name.
 * @returns A boolean depending on whether at least 1 import specifier matches the opening element node name.
 */
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
