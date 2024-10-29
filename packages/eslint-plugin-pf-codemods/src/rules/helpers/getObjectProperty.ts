import { Rule } from "eslint";
import { Property } from "estree-jsx";
import { propertyNameMatches } from "./propertyNameMatches";

/** Can be used to run logic on the specified property of an ObjectExpression or
 * only if the specified property exists.
 */
export function getObjectProperty(
  context: Rule.RuleContext,
  properties: Property[],
  name: string
) {
  if (!properties.length) {
    return;
  }

  const matchedProperty = properties.find((property) =>
    propertyNameMatches(context, property.key, property.computed, name)
  );

  return matchedProperty;
}
