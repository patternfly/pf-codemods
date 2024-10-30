import { Rule } from "eslint";
import { Identifier, MemberExpression } from "estree-jsx";
import { getVariableDeclaration } from ".";

/** Used to get a property name on an enum (MemberExpression). */
export function getEnumPropertyName(
  context: Rule.RuleContext,
  enumNode: MemberExpression
) {
  const isIdentifier = enumNode.property.type === "Identifier";
  const computed = enumNode.computed;

  // E.g. const key = "key"; someEnum[key]
  if (isIdentifier && computed) {
    const scope = context.getSourceCode().getScope(enumNode);
    const propertyName = (enumNode.property as Identifier).name;
    const propertyVariable = getVariableDeclaration(propertyName, scope);
    return propertyVariable?.defs[0].node.init.value as string;
  }
  // E.g. someEnum.key
  if (isIdentifier && !computed) {
    return (enumNode.property as Identifier).name;
  }
  // E.g. someEnum["key"]
  if (enumNode.property.type === "Literal") {
    return enumNode.property.value as string;
  }
}
