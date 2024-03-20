import { JSXElement, JSXOpeningElement } from "estree-jsx";

type NodeWithParent = (JSXOpeningElement | JSXElement) & {
  parent?: NodeWithParent | null;
};

export function findAncestor(
  node: NodeWithParent,
  conditionCallback: (_current: NodeWithParent) => boolean
): NodeWithParent | undefined {
  if (!node) {
    return;
  }

  let current = node.parent;

  while (current) {
    if (conditionCallback(current)) {
      return current;
    }

    current = current.parent;
  }
}
