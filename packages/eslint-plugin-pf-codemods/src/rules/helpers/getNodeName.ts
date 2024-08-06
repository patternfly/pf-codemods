import { JSXOpeningElement, JSXMemberExpression } from "estree-jsx";

function getJSXMemberExpressionName(node: JSXMemberExpression) {
  switch (node.object.type) {
    case "JSXMemberExpression":
      return getJSXMemberExpressionName(node.object);
    case "JSXIdentifier":
      return node.object.name;
  }
}

/** Gets the name of an opening element */
export function getNodeName(node: JSXOpeningElement) {
  switch (node.name.type) {
    case "JSXMemberExpression":
      return getJSXMemberExpressionName(node.name);
    case "JSXIdentifier":
    case "JSXNamespacedName":
      return typeof node.name.name === "string"
        ? node.name.name
        : node.name.name.name;
  }
}
