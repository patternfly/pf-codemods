import { JSXElement } from "estree-jsx";

/**
 * Use inline to pair with logic that depends on whether a JSXElement has children or not.
 * @param children The children property of the JSX element node object.
 * @returns A boolean depending on whether the node has valid children or not.
 */
export function childrenIsEmpty(children: JSXElement["children"]) {
  return (
    !children.length ||
    (children.length === 1 &&
      children[0].type === "JSXText" &&
      children[0].value.trim() === "")
  );
}
