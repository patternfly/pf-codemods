import { Rule } from "eslint";
import { JSXElement } from "estree-jsx";
import { removeElement, removeEmptyLineAfter } from "../index";

/**
 * Use inline within the context.report's fix method to remove entire JSX elements. This can be returned on its own or spread as part of a fixes array.
 * @param context The context object from the top level create method of the rule being written.
 * @param fixer The fixer parameter from the fix method of the context.report object.
 * @param elementsToRemove An array of JSXElement objects to remove.
 * @returns An array of fixers to apply when the rule is ran with the fix flag.
 */
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
