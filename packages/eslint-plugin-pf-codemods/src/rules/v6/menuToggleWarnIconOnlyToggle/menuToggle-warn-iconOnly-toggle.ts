import { Rule } from "eslint";
import { ImportDeclaration, ImportSpecifier } from "estree-jsx";
import { getFromPackage } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10097
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const menuToggleImport = imports.find(
      (specifier) => specifier.imported.name === "MenuToggle"
    );

    return !menuToggleImport
      ? {}
      : {
          ImportDeclaration(node: ImportDeclaration) {
            if (
              node.specifiers.find(
                (specifier) =>
                  (specifier as ImportSpecifier).imported?.name ===
                  menuToggleImport.imported.name
              )
            ) {
              context.report({
                node,
                message:
                  "We now recommend passing any icon to the `icon` prop instead of passing it as children, such as for plain, icon only toggles. Passing an icon as children will result in incorrect styling.",
              });
            }
          },
        };
  },
};
