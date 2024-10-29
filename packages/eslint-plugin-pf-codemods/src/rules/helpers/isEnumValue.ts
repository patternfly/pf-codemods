import { MemberExpression } from "estree-jsx";
import { propertyNameMatches } from "./propertyNameMatches";
import { Rule } from "eslint";

/** Checks whether an enum node (MemberExpression), e.g. ButtonVariant["primary"]
 * has a given enumName ("ButtonVariant") and a given propertyName ("primary") */
export function isEnumValue(
  context: Rule.RuleContext,
  enumExpression: MemberExpression,
  enumName: string,
  propertyName: string
) {
  return (
    enumExpression.object?.type === "Identifier" &&
    enumExpression.object.name === enumName &&
    propertyNameMatches(
      context,
      enumExpression.property,
      enumExpression.computed,
      propertyName
    )
  );
}
