import { Rule } from "eslint";
import { JSXAttribute } from "estree-jsx";
import { getVariableDeclaration } from "./JSXAttributes";

/** Used to find the node where a prop value is initially assigned, to then be passed
 * as a fixer function's nodeOrToken argument. Useful for when a prop may have an inline value, e.g. `<Comp prop="value" />`, or
 * is passed an identifier, e.g. `const val = "value"; <Comp prop={val} />`
 */
export function getNodeForAttributeFixer(
  context: Rule.RuleContext,
  attribute: JSXAttribute
) {
  if (!attribute.value) {
    return;
  }

  if (
    attribute.value.type === "JSXExpressionContainer" &&
    attribute.value.expression.type === "Identifier"
  ) {
    const scope = context.getSourceCode().getScope(attribute);
    const variableDeclaration = getVariableDeclaration(
      attribute.value.expression.name,
      scope
    );

    return variableDeclaration && variableDeclaration.defs[0].node.init;
  }

  if (attribute.value.type === "Literal") {
    return attribute.value;
  }
  if (
    attribute.value.type === "JSXExpressionContainer" &&
    ["ObjectExpression", "MemberExpression"].includes(
      attribute.value.expression.type
    )
  ) {
    return attribute.value.expression;
  }
}
