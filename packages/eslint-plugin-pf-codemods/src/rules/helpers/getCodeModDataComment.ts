import { ImportSpecifier } from "estree-jsx";
import { Rule, SourceCode } from "eslint";
import { ImportDefaultSpecifierWithParent } from "./interfaces";

/**
 * Use inline to check whether an import specifier has a data-codemod comment, and conditionally run logic based on its existence or absence.
 * @param context The context object from the ancestor create method.
 * @param importSpecifier The specifier in which to find whether the data-codemod comment exists.
 * @param commentToFind The string to check whether is included in a comment. By default this is "data-codemods", but can be customized for more fine-tuned logic.
 * @returns The first Comment object if the data-codemod string was found, or undefined otherwise.
 */
export function getCodeModDataComment(
  sourceCode: SourceCode,
  importSpecifier: ImportSpecifier | ImportDefaultSpecifierWithParent,
  commentToFind: string = "data-codemods"
) {
  const { leading, trailing } = sourceCode.getComments(importSpecifier);

  return [...leading, ...trailing].find((comment) =>
    comment.value.includes(commentToFind)
  );
}
