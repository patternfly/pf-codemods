import { Rule } from "eslint";
import { JSXElement } from "estree-jsx";
import { getFromPackage, getDefaultImportsFromPackage } from "./index";

/** Returns true if an element is a patternfly/react-icons import, false if it isn't, and undefined
 *  if no element is passed (for type safety) */
export function isReactIcon(context: Rule.RuleContext, element?: JSXElement) {
  if (!element) {
    return;
  }

  const openingElementIdentifier = element.openingElement.name;

  // TODO: update this to use the appropriate getNodeName helper once it lands
  if (openingElementIdentifier.type !== "JSXIdentifier") {
    return;
  }
  const elementName = openingElementIdentifier.name;

  const pfIconsPackage = "@patternfly/react-icons";
  const { imports: iconImports } = getFromPackage(context, pfIconsPackage);
  const iconDefaultImports = getDefaultImportsFromPackage(
    context,
    pfIconsPackage
  );
  const allIconImports = [...iconImports, ...iconDefaultImports];

  return allIconImports.some(
    (iconImport) => iconImport.local.name === elementName
  );
}
