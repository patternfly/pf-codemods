import { Rule } from "eslint";
import { JSXAttribute } from "estree-jsx";
import { getVariableDeclaration, getVariableInit } from "./JSXAttributes";

/** Used to find the node where a prop value is initially assigned, to then be passed
 * as a fixer function's nodeOrToken argument. Useful for when a prop may have an inline value, e.g. `<Comp prop="value" />`, or
 * is passed an identifier, e.g. `const val = "value"; <Comp prop={val} />`
 */
export function getNodeForAttributeFixer(
  context: Rule.RuleContext,
  attribute: JSXAttribute
) {
  if (!attribute?.value) {
    return;
  }

  switch (attribute.value.type) {
    case "Literal":
      return attribute.value;
    case "JSXExpressionContainer":
      return getJSXExpressionContainerValue(context, attribute);
  }
}

function getJSXExpressionContainerValue(
  context: Rule.RuleContext,
  attribute: JSXAttribute
) {
  if (!attribute.value || attribute.value.type !== "JSXExpressionContainer") {
    return;
  }

  switch (attribute.value.expression.type) {
    case "ObjectExpression":
    case "MemberExpression":
      return attribute.value.expression;
    case "Identifier":
      const scope = context.getSourceCode().getScope(attribute);
      const variableDeclaration = getVariableDeclaration(
        attribute.value.expression.name,
        scope
      );

      return getVariableInit(variableDeclaration);
  }
}
