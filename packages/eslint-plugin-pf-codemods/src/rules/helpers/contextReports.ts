import { Node } from "estree-jsx";
import { AST, Rule } from "eslint";

export function replaceNodeText(
  context: Rule.RuleContext,
  node: Node,
  nodeToReplace: Node | AST.Token,
  message: string,
  replacement: string
) {
  return context.report({
    node,
    message,
    fix(fixer) {
      return fixer.replaceText(nodeToReplace, replacement);
    },
  });
}
