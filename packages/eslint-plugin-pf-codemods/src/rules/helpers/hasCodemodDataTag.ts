import { JSXAttribute, JSXOpeningElement } from "estree-jsx";
import { getAttributeName } from "./getAttributeName";

/** Returns true if the passed opening element has a data-codemods attribute */
export function hasCodeModDataTag(openingElement: JSXOpeningElement) {
  const nonSpreadAttributes = openingElement.attributes.filter(
    (attr) => attr.type === "JSXAttribute"
  );
  const attributeNames = nonSpreadAttributes.map((attr) =>
    getAttributeName(attr as JSXAttribute)
  );
  return attributeNames.includes("data-codemods");
}
