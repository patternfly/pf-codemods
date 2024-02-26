import { getFromPackage } from "../../helpers";
import { Rule } from "eslint";
import { JSXOpeningElement, JSXAttribute } from "estree-jsx";

// https://github.com/patternfly/patternfly-react/pull/10027
module.exports = {
  meta: {},
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const jumpLinksItemImport = imports.find(
      (specifier) => specifier.imported.name === "JumpLinksItem"
    );

    return !jumpLinksItemImport
      ? {}
      : {
          JSXOpeningElement(node: JSXOpeningElement) {
            if (
              node.name.type === "JSXIdentifier" &&
              jumpLinksItemImport.local.name === node.name.name
            ) {
              const hrefAttribute = node.attributes.find(
                (attribute) =>
                  attribute.type === "JSXAttribute" &&
                  attribute.name.name === "href"
              );

              if (!hrefAttribute || !(hrefAttribute as JSXAttribute).value) {
                context.report({
                  node,
                  message: "The `href` prop on JumpLinksItem is now required.",
                });
              }
            }
          },
        };
  },
};
