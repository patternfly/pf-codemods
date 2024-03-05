import { JSXElement, JSXOpeningElement } from "estree-jsx";

type ElementWithParent = (JSXOpeningElement | JSXElement) & {
  parent?: ElementWithParent | null;
};

export function findElementAncestor(
  node: ElementWithParent,
  ancestorNameToFind: string
): JSXElement | undefined {
  if (!node) {
    return;
  }

  let current = node.parent;

  while (current) {
    if (
      current.type === "JSXElement" &&
      current.openingElement.name.type === "JSXIdentifier" &&
      current.openingElement.name.name === ancestorNameToFind
    ) {
      return current;
    }

    current = current.parent;
  }
}
