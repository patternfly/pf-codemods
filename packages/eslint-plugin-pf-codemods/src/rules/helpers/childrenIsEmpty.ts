import { JSXElement } from "estree-jsx";

/** Checks whether children is empty (no children or only whitespaces) */
export function childrenIsEmpty(children: JSXElement["children"]) {
  return (
    !children.length ||
    (children.length === 1 &&
      children[0].type === "JSXText" &&
      children[0].value.trim() === "")
  );
}
