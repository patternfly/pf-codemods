import { JSXElement } from "estree-jsx";

export function getChildElementByName(node: JSXElement, name: string) {
  return node.children?.find(
    (child) =>
      child.type === "JSXElement" &&
      child.openingElement.name.type === "JSXIdentifier" &&
      child.openingElement.name.name === name
  ) as JSXElement | undefined;
}

export function getAllChildElementsByName(node: JSXElement, name: string) {
  return node.children?.filter(
    (child) =>
      child.type === "JSXElement" &&
      child.openingElement.name.type === "JSXIdentifier" &&
      child.openingElement.name.name === name
  ) as JSXElement[] | undefined;
}

export function nodeIsComponentNamed(node: JSXElement, componentName: string) {
  if (node.openingElement.name.type === "JSXIdentifier") {
    return node.openingElement.name.name === componentName;
  }

  return false;
}
