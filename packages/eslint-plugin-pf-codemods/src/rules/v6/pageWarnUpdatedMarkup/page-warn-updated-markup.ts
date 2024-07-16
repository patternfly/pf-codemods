import { Rule } from "eslint";
import { JSXOpeningElement } from "estree-jsx";
import { getFromPackage, getAnyAttribute } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10650
module.exports = {
  meta: {},
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const pageImport = imports.find(
      (specifier) => specifier.imported.name === "Page"
    );

    return !pageImport
      ? {}
      : {
          JSXOpeningElement(node: JSXOpeningElement) {
            if (
              node.name.type === "JSXIdentifier" &&
              pageImport.local.name === node.name.name
            ) {
              const applicableProps = getAnyAttribute(node, [
                "horizontalSubnav",
                "breadcrumb",
              ]);
              if (applicableProps) {
                context.report({
                  node,
                  message:
                    "The markup for Page has changed. When either the `horizontalSubnav` or `breadcrumb` props are passed, a PageBody component will always wrap the contents.",
                });
              }
            }
          },
        };
  },
};
