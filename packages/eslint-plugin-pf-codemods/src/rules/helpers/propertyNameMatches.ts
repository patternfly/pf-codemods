import { Rule } from "eslint";
import { Expression, Identifier, PrivateIdentifier } from "estree-jsx";
import { getVariableDeclaration } from "./JSXAttributes";

/** Check whether a property name is of a given value.
 * Property can either be of an ObjectExpression - {propName: "value"} or MemberExpression - someObject.propName */
export function propertyNameMatches(
  context: Rule.RuleContext,
  key: Expression | PrivateIdentifier,
  computed: boolean,
  name: string
) {
  const isIdentifier = key.type === "Identifier";

  // E.g. const key = "key"; {[key]: value}; someObject[key]
  if (isIdentifier && computed) {
    const scope = context.getSourceCode().getScope(key);
    const propertyName = (key as Identifier).name;
    const propertyVariable = getVariableDeclaration(propertyName, scope);
    return propertyVariable?.defs[0].node.init.value === name;
  }
  // E.g. {key: value}; someObject.key
  if (isIdentifier && !computed) {
    return (key as Identifier).name === name;
  }
  // E.g. {"key": value} or {["key"]: value}; someObject["key"]
  if (key.type === "Literal") {
    return key.value === name;
  }

  return false;
}
