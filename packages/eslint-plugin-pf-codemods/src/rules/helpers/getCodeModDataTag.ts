import { JSXAttribute, JSXOpeningElement } from "estree-jsx";
import { getAttributeName } from "./getAttributeName";

/** Returns the data-codemods attribute of an element, if it exists */
export function getCodeModDataTag(openingElement: JSXOpeningElement) {
  const nonSpreadAttributes = openingElement.attributes.filter(
    (attr) => attr.type === "JSXAttribute"
  );

  return nonSpreadAttributes.find(
    (attr) => getAttributeName(attr as JSXAttribute) === "data-codemods"
  );
}
