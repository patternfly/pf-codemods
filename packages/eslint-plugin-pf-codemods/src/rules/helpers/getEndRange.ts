import { SourceCode } from "eslint";
import {
  ImportSpecifier,
  ImportDefaultSpecifier,
  ImportNamespaceSpecifier,
} from "estree-jsx";

export const getEndRange = (
  sourceCode: SourceCode,
  specifier: ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier
) => {
  const tokenAfter = sourceCode.getTokenAfter(specifier);
  const commentsAfter = sourceCode.getCommentsAfter(specifier);

  if (tokenAfter?.value === ",") {
    return sourceCode.getTokenAfter(tokenAfter)?.range[0];
  }

  if (commentsAfter?.length) {
    return commentsAfter[commentsAfter.length - 1]?.range?.[1];
  }

  return specifier.range?.[1];
};
