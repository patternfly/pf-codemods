import { Rule } from "eslint";
import { ImportSpecifier, JSXOpeningElement } from "estree-jsx";
import {
  checkMatchingJSXOpeningElement,
  getAttribute,
  getFromPackage,
} from "../../helpers";

module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const { imports: coreImports } = getFromPackage(
      context,
      "@patternfly/react-core"
    );
    const { imports: tableImports } = getFromPackage(
      context,
      "@patternfly/react-table"
    );

    const imports = [...coreImports, ...tableImports];

    const message =
      "This rule will remove data-codemods attributes and comments, which were introduced by our codemods in order to work correctly.";

    return {
      JSXOpeningElement(node: JSXOpeningElement) {
        if (checkMatchingJSXOpeningElement(node, imports)) {
          const dataCodemodsAttribute = getAttribute(node, "data-codemods");
          if (dataCodemodsAttribute) {
            context.report({
              node,
              message,
              fix(fixer) {
                return fixer.remove(dataCodemodsAttribute);
              },
            });
          }
        }
      },
      ImportSpecifier(node: ImportSpecifier) {
        if (imports.some((specifier) => specifier === node)) {
          const comments = context.getSourceCode().getCommentsAfter(node);
          const dataCodemodsComment = comments.find((comment) =>
            comment.value.includes("data-codemods")
          );
          if (dataCodemodsComment) {
            context.report({
              node,
              message,
              fix(fixer) {
                return fixer.removeRange(dataCodemodsComment.range!);
              },
            });
          }
        }
      },
    };
  },
};
