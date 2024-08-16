import { Rule } from "eslint";
import { Property, Identifier } from "estree-jsx";
import { getVariableDeclaration } from "./JSXAttributes";

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

  const matchedProperty = properties.find((property) => {
    const isIdentifier = property.key.type === "Identifier";
    const { computed } = property;

    // E.g. const key = "key"; {[key]: value}
    if (isIdentifier && computed) {
      const scope = context.getSourceCode().getScope(property);
      const propertyName = (property.key as Identifier).name;
      const propertyVariable = getVariableDeclaration(propertyName, scope);
      return propertyVariable?.defs[0].node.init.value === name;
    }
    // E.g. {key: value}
    if (isIdentifier && !computed) {
      return (property.key as Identifier).name === name;
    }
    // E.g. {"key": value} or {["key"]: value}
    if (property.key.type === "Literal") {
      return property.key.value === name;
    }
  });

  return matchedProperty;
}
