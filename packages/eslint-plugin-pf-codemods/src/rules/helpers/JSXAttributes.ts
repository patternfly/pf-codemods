import { JSXElement, JSXAttribute } from "estree-jsx";

export function getAttribute(node: JSXElement, attributeName: string) {
  return node.openingElement.attributes.find(
    (attr) => attr.type === "JSXAttribute" && attr.name.name === attributeName
  ) as JSXAttribute | undefined;
}

export function getExpression(node?: JSXAttribute["value"]) {
  if (!node) {
    return;
  }

  if (node.type === "JSXExpressionContainer") {
    return node.expression;
  }
}
