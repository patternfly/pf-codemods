import { Rule } from "eslint";
import { JSXOpeningElement } from "estree-jsx";
import { getFromPackage, getAttribute } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10646
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const switchImport = imports.find(
      (specifier) => specifier.imported.name === "Switch"
    );

    return !switchImport
      ? {}
      : {
          JSXOpeningElement(node: JSXOpeningElement) {
            if (
              node.name.type === "JSXIdentifier" &&
              switchImport.local.name === node.name.name
            ) {
              const attribute = getAttribute(node, "labelOff");
              if (attribute) {
                context.report({
                  node,
                  message:
                    "The `labelOff` prop has been removed from Switch. The label for a Switch should not dynamically update based on the on/off state.",
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
