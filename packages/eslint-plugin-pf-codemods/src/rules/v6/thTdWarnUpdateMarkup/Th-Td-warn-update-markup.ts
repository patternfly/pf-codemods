import { Rule } from "eslint";
import { JSXOpeningElement } from "estree-jsx";
import { getFromPackage, getAttribute } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10378
module.exports = {
  meta: {},
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-table");

    const componentImports = imports.filter((specifier) =>
      ["Th", "Td"].includes(specifier.imported.name)
    );

    return !componentImports.length
      ? {}
      : {
          JSXOpeningElement(node: JSXOpeningElement) {
            if (
              node.name.type === "JSXIdentifier" &&
              componentImports
                .map((imp) => imp.local.name)
                .includes(node.name.name)
            ) {
              const attribute = getAttribute(node, "isStickyColumn");
              if (attribute) {
                context.report({
                  node,
                  message:
                    "The `--pf-v6-c-table__sticky-cell--Left` and `--pf-v6-c-table__sticky-cell--Right` CSS variables applied as inline styles have been updated to `--pf-v6-c-table__sticky-cell--InsetInlineStart` and `--pf-v6-c-table__sticky-cell--InsetInlineEnd`, respectively.",
                });
              }
            }
          },
        };
  },
};
