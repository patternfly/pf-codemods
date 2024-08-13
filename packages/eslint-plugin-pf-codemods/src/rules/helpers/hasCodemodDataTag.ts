import { JSXOpeningElement } from "estree-jsx";
import { getCodeModDataTag } from "./getCodeModDataTag";

/** Returns true if the passed opening element has a data-codemods attribute */
export function hasCodeModDataTag(openingElement: JSXOpeningElement) {
  return !!getCodeModDataTag(openingElement)
}
