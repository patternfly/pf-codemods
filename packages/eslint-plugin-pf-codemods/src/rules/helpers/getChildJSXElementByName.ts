import {
  JSXElement,
  JSXText,
  JSXExpressionContainer,
  JSXSpreadChild,
  JSXFragment,
} from "estree-jsx";

function getChildJSXElementCallback(
  childNode:
    | JSXElement
    | JSXText
    | JSXExpressionContainer
    | JSXSpreadChild
    | JSXFragment,
  name: string
) {
  return (
    childNode.type === "JSXElement" &&
    childNode.openingElement.name.type === "JSXIdentifier" &&
    childNode.openingElement.name.name === name
  );
}

/** Can be used to run logic if the specific child element exists, or to run logic on the
 * specified element.
 */
export function getChildJSXElementByName(node: JSXElement, name: string) {
  return node.children?.find((child) =>
    getChildJSXElementCallback(child, name)
  ) as JSXElement | undefined;
}

/** Can be used to run logic if the specific child elements exist, or to run logic on the
 * specified elements.
 */
export function getAllChildJSXElementsByName(node: JSXElement, name: string) {
  return node.children?.filter((child) =>
    getChildJSXElementCallback(child, name)
  ) as JSXElement[];
}
