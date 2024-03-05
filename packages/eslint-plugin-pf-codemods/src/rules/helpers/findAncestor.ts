import { Node } from "estree-jsx";

type NodeWithParent = Node & {
  parent?: NodeWithParent | null;
};

export function findAncestor(
  node: NodeWithParent,
  conditionCallback: (_current: NodeWithParent) => boolean
) {
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
