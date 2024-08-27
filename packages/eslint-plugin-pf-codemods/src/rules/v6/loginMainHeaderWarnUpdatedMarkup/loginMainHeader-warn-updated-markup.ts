import { Rule } from "eslint";
import { ImportDeclaration } from "estree-jsx";
import { getFromPackage, checkMatchingImportDeclaration } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10880
module.exports = {
  meta: {},
  create: function (context: Rule.RuleContext) {
    const basePackage = "@patternfly/react-core";
    const { imports: loginImports } = getFromPackage(context, basePackage, [
      "LoginPage",
      "LoginMainHeader",
    ]);

    return !loginImports.length
      ? {}
      : {
          ImportDeclaration(node: ImportDeclaration) {
            if (checkMatchingImportDeclaration(node, loginImports)) {
              const hasLoginPageImport = loginImports.find(
                (imp) => imp.imported.name === "LoginPage"
              );
              context.report({
                node,
                message: `The markup for LoginMainHeader${
                  hasLoginPageImport
                    ? " (which is used internally within LoginPage)"
                    : ""
                } has been updated, now using a div wrapper instead of a header element wrapper.`,
              });
            }
          },
        };
  },
};
