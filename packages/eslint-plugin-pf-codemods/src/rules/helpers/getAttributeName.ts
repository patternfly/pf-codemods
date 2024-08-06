import { JSXAttribute } from "estree-jsx";

/** Gets the name value of a JSX attribute */
export function getAttributeName(attr: JSXAttribute) {
  switch (attr.name.type) {
    case "JSXIdentifier":
      return attr.name.name;
    case "JSXNamespacedName":
      return attr.name.name.name;
  }
}
