import { Rule } from "eslint";
import { JSXElement } from "estree-jsx";
import { removeElement, removeEmptyLineAfter } from "./index";

export const getRemoveElementFixes = (
  context: Rule.RuleContext,
  fixer: Rule.RuleFixer,
  elementsToRemove: JSXElement[]
) => {
  return elementsToRemove
    .map((element) => [
      ...removeElement(fixer, element),
      ...removeEmptyLineAfter(context, fixer, element),
    ])
    .flat();
};
