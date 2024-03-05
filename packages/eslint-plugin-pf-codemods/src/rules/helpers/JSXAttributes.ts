import { JSXElement, JSXAttribute } from "estree-jsx";

export function getAttribute(node: JSXElement, attributeName: string) {
  const attributes = node.openingElement.attributes.filter(
    (attr) => attr.type === "JSXAttribute"
  ) as JSXAttribute[];
  return attributes.find((attr) => attr.name.name === attributeName);
}

export function getExpression(node?: JSXAttribute["value"]) {
  if (!node) {
    return;
  }

  if (node.type === "JSXExpressionContainer") {
    return node.expression;
  }
}
