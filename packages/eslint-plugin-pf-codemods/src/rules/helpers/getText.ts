import { Rule } from "eslint";

import {
  JSXAttribute,
  JSXElement,
  JSXExpressionContainer,
  JSXFragment,
  Node,
} from "estree-jsx";

export function getAttributeText(
  context: Rule.RuleContext,
  attribute?: JSXAttribute
) {
  if (!attribute) {
    return "";
  }

  return context.sourceCode.getText(attribute);
}

export function getAttributeValueText(
  context: Rule.RuleContext,
  attribute?: JSXAttribute
) {
  if (!attribute || !attribute.value) {
    return "";
  }

  return context.sourceCode.getText(attribute.value);
}

export function getNodesText(context: Rule.RuleContext, nodes: Node[]) {
  return nodes.map((node) => context.sourceCode.getText(node)).join("");
}

export function getChildrenAsAttributeValueText(
  context: Rule.RuleContext,
  children: JSXElement["children"]
) {
  if (!children.length) {
    return `""`;
  }

  // is a single text-only child
  if (children.length === 1 && children[0].type === "JSXText") {
    const childText = children[0].value.trim();

    if (childText.includes(`"`)) {
      return `{<>${childText}</>}`;
    }

    return `"${childText}"`;
  }

  const nonEmptyChildrenNodes = children.filter(
    (child) => !(child.type === "JSXText" && child.value.trim() === "")
  );

  if (nonEmptyChildrenNodes.length === 1) {
    const singleChild = nonEmptyChildrenNodes[0];
    const singleChildText = context
      .sourceCode
      .getText(
        singleChild as JSXExpressionContainer | JSXElement | JSXFragment
      );

    return singleChild.type === "JSXExpressionContainer"
      ? singleChildText
      : `{${singleChildText}}`;
  }

  return `{<>${getNodesText(context, children as Node[])}</>}`;
}
