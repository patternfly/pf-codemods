import { Rule } from "eslint";
import { JSXOpeningElement } from "estree-jsx";
import { getFromPackage, getAttribute } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10687
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const navItemImport = imports.find(
      (specifier) => specifier.imported.name === "NavItem"
    );

    return !navItemImport
      ? {}
      : {
          JSXOpeningElement(node: JSXOpeningElement) {
            if (
              node.name.type === "JSXIdentifier" &&
              navItemImport.local.name === node.name.name
            ) {
              const attribute = getAttribute(node, "hasNavLinkWrapper");
              if (attribute) {
                context.report({
                  node,
                  message:
                    "The `hasNavLinkWrapper` prop has been removed from NavItem. Additionally, any icons for a NavItem should be passed to its new `icon` prop.",
                  fix(fixer) {
                    return fixer.replaceText(attribute, "");
                  },
                });
              }
            }
          },
        };
  },
};
