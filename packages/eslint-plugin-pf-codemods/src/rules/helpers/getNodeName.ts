import { JSXOpeningElement, JSXMemberExpression } from "estree-jsx";

/** Gets the name of an opening element or member expression */
export function getNodeName(node: JSXOpeningElement | JSXMemberExpression) {
  if (node.type === "JSXMemberExpression") {
    switch (node.object.type) {
      case "JSXMemberExpression":
        return getNodeName(node.object);
      case "JSXIdentifier":
        return node.object.name;
    }
  }

  switch (node.name.type) {
    case "JSXMemberExpression":
      return getNodeName(node.name);
    case "JSXIdentifier":
    case "JSXNamespacedName":
      return typeof node.name.name === "string"
        ? node.name.name
        : node.name.name.name;
  }
}
