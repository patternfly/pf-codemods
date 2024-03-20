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

// import { JSXElement, JSXOpeningElement } from "estree-jsx";

// type ElementWithParent = (JSXOpeningElement | JSXElement) & {
//   parent?: ElementWithParent | null;
// };

// export function findAncestorByName(
//   node: ElementWithParent,
//   ancestorNameToFind: string
// ): JSXElement | undefined {
//   if (!node) {
//     return;
//   }

//   let current = node.parent;

//   while (current) {
//     if (
//       current.type === "JSXElement" &&
//       current.openingElement.name.type === "JSXIdentifier" &&
//       current.openingElement.name.name === ancestorNameToFind
//     ) {
//       return current;
//     }

//     current = current.parent;
//   }
// }
