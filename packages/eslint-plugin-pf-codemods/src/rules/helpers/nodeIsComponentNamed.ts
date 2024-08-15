import { JSXElement } from "estree-jsx";

export function nodeIsComponentNamed(node: JSXElement, componentName: string) {
  if (node.openingElement.name.type === "JSXIdentifier") {
    return node.openingElement.name.name === componentName;
  }

  return false;
}
