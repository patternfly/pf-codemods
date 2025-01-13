import { Rule } from "eslint";
import { Expression, PrivateIdentifier } from "estree-jsx";
import { getVariableValue } from "./JSXAttributes";

/** Check whether a property name is of a given value.
 * Property can either be of an ObjectExpression - {propName: "value"} or MemberExpression - someObject.propName */
export function propertyNameMatches(
  context: Rule.RuleContext,
  key: Expression | PrivateIdentifier,
  computed: boolean,
  name: string
) {
  if (key.type === "Identifier") {
    // E.g. const key = "key"; {[key]: value}; someObject[key]
    if (computed) {
      const scope = context.getSourceCode().getScope(key);
      const propertyName = key.name;
      const propertyVariableValue = getVariableValue(
        propertyName,
        scope,
        context
      ).value;

      return propertyVariableValue === name;
    }
    // E.g. {key: value}; someObject.key
    return key.name === name;
  }

  // E.g. {"key": value} or {["key"]: value}; someObject["key"]
  if (key.type === "Literal") {
    return key.value === name;
  }

  return false;
}
