import { getFromPackage } from "../../helpers";
import { Rule } from "eslint";
import { ImportDeclaration } from "estree-jsx";

// https://github.com/patternfly/patternfly-react/pull/10089
module.exports = {
  meta: {},
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const menuItemActionImport = imports.find(
      (specifier) => specifier.imported.name === "MenuItemAction"
    );

    return !menuItemActionImport
      ? {}
      : {
          ImportDeclaration(node: ImportDeclaration) {
            if (
              node.specifiers.find(
                (specifier) =>
                  specifier.type === "ImportSpecifier" &&
                  specifier.imported.name === menuItemActionImport.imported.name
              )
            ) {
              context.report({
                node,
                message:
                  "The markup for MenuItemAction has been updated. It now uses our Button component internally, has a wrapper around the action button, and no longer renders an icon wrapper inside the action button.",
              });
            }
          },
        };
  },
};
