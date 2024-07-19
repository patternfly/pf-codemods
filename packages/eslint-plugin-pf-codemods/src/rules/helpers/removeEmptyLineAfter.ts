import { AST, Rule } from "eslint";
import { ImportSpecifier, JSXElement } from "estree-jsx";

export const removeEmptyLineAfter = (
  context: Rule.RuleContext,
  fixer: Rule.RuleFixer,
  node?: JSXElement | ImportSpecifier | AST.Token | null
) => {
  if (!node) {
    return [];
  }
  const token = context.getSourceCode().getTokenAfter(node);

  return token && token.type === "JSXText" && token.value.trim() === ""
    ? [fixer.remove(token)]
    : [];
};
