import { Rule } from "eslint";
import { JSXElement, JSXText } from "estree-jsx";
import { childrenIsEmpty } from ".";

/** Transforms JSXElement to a self-closing tag.
 * Works only on elements without children by default, but you can overwrite this behaviour with the removeChildren parameter.
 */
export function makeJSXElementSelfClosing(
  node: JSXElement,
  context: Rule.RuleContext,
  fixer: Rule.RuleFixer,
  removeChildren: boolean = false
): Rule.Fix[] {
  if (!node.closingElement) {
    return [];
  }

  const fixes = [];

  const emptyChildren = childrenIsEmpty(node.children);

  if (removeChildren || emptyChildren) {
    const closingSymbol = context
      .getSourceCode()
      .getLastToken(node.openingElement)!;

    fixes.push(
      fixer.replaceText(closingSymbol, " />"),
      fixer.remove(node.closingElement)
    );

    if (node.children.length) {
      if (removeChildren) {
        fixes.push(
          fixer.removeRange([
            node.children[0].range![0],
            node.children[node.children.length - 1].range![1],
          ])
        );
      } else if (emptyChildren) {
        fixes.push(fixer.remove(node.children[0] as JSXText));
      }
    }
  }

  return fixes;
}
