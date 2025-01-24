import { Rule } from "eslint";
import { MemberExpression } from "estree-jsx";
import { getVariableValue } from ".";

/** Used to get a property name on an enum (MemberExpression). */
export function getEnumPropertyName(
  context: Rule.RuleContext,
  enumNode: MemberExpression
) {
  if (enumNode.property.type === "Identifier") {
    // E.g. const key = "key"; someEnum[key]
    if (enumNode.computed) {
      const scope = context.getSourceCode().getScope(enumNode);
      const propertyName = enumNode.property.name;

      return getVariableValue(propertyName, scope, context).value?.toString();
    }
    // E.g. someEnum.key
    return enumNode.property.name;
  }

  // E.g. someEnum["key"]
  if (enumNode.property.type === "Literal") {
    return enumNode.property.value?.toString();
  }
}
