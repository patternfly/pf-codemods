import { getAllImportsFromPackage, getComponentImportName } from "../../helpers";
import { Rule } from "eslint";
import { ImportDeclaration } from "estree-jsx";

// https://github.com/patternfly/react-user-feedback/pull/76
module.exports = {
  meta: {},
  create: function (context: Rule.RuleContext) {
    const imports = getAllImportsFromPackage(context, "@patternfly/react-user-feedback", ["FeedbackModal"]);

    return !imports.length
      ? {}
      : {
          ImportDeclaration(node: ImportDeclaration) {
            if (
              node.specifiers.find(
                (specifier) =>
                  (specifier.type === "ImportSpecifier" || specifier.type === "ImportDefaultSpecifier")
                  && getComponentImportName(specifier, ["FeedbackModal"]) === "FeedbackModal"
                )
            ) {
              context.report({
                node,
                message: `FeedbackModal no longer internally references a scss stylesheet. You may have to import "Feedback.css" located in the dist "@patternfly/react-user-feedback/dist/esm/Feedback/Feedback.css" to maintain styling on FeedbackModal.`,
              });
            }
          },
        };
  },
};
