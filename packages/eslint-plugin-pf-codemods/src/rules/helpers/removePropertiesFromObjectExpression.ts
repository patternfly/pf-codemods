import { Property } from "estree-jsx";

/** Can be used to take the returned array and join it into a replacement string of object
 * key:value pairs.
 */
export function removePropertiesFromObjectExpression(
  currentProperties: Property[],
  propertiesToRemove: (Property | undefined)[]
) {
  if (!currentProperties) {
    return [];
  }
  if (!propertiesToRemove) {
    return currentProperties;
  }

  const propertyNamesToRemove = propertiesToRemove.map((property) => {
    if (property?.key.type === "Identifier") {
      return property.key.name;
    }

    if (property?.key.type === "Literal") {
      return property.key.value;
    }

    return "";
  });

  const propertiesToKeep = currentProperties.filter((property) => {
    if (property.key.type === "Identifier") {
      return !propertyNamesToRemove.includes(property.key.name);
    }

    if (property.key.type === "Literal") {
      return propertyNamesToRemove.includes(property.key.value);
    }

    return false;
  });

  return propertiesToKeep;
}
