import { Rule } from "eslint";
import { JSXElement } from "estree-jsx";

export const removeElement = (fixer: Rule.RuleFixer, node?: JSXElement) => {
  if (!node) {
    return [];
  }

  return [fixer.remove(node)];
};
