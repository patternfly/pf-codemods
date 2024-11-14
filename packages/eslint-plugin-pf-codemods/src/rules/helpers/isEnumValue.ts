import { MemberExpression } from "estree-jsx";
import { propertyNameMatches } from "./propertyNameMatches";
import { Rule } from "eslint";

/** Checks whether an enum node (MemberExpression), e.g. ButtonVariant["primary"]
 * has a given enumName ("ButtonVariant") and a given propertyName ("primary"), or one of given property names. */
export function isEnumValue(
  context: Rule.RuleContext,
  enumExpression: MemberExpression,
  enumName: string,
  propertyName: string | string[]
) {
  if (
    enumExpression?.object?.type === "Identifier" &&
    enumExpression?.object?.name === enumName
  ) {
    const nameMatches = (name: string) =>
      propertyNameMatches(
        context,
        enumExpression.property,
        enumExpression.computed,
        name
      );

    if (Array.isArray(propertyName)) {
      return propertyName.some((name) => nameMatches(name));
    }

    return nameMatches(propertyName);
  }

  return false;
}
