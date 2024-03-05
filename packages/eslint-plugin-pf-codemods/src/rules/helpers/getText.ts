import { Rule } from "eslint";

import { JSXAttribute, Node } from "estree-jsx";

export function getAttributeText(
  context: Rule.RuleContext,
  attribute?: JSXAttribute
) {
  if (!attribute) {
    return "";
  }

  return context.getSourceCode().getText(attribute);
}

export function getAttributeValueText(
  context: Rule.RuleContext,
  attribute?: JSXAttribute
) {
  if (!attribute || !attribute.value) {
    return "";
  }

  return context.getSourceCode().getText(attribute.value);
}

export function getNodesText(context: Rule.RuleContext, nodes: Node[]) {
  return nodes.map((node) => context.getSourceCode().getText(node)).join("");
}
