import { getFromPackage } from "../../helpers";
import { Rule } from "eslint";
import { JSXOpeningElement } from "estree-jsx";

// https://github.com/patternfly/patternfly-react/pull/9876
module.exports = {
  meta: {},
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const accordionItemImport = imports.find(
      (specifier: { imported: { name: string } }) =>
        specifier.imported.name === "AccordionItem"
    );

    return !accordionItemImport
      ? {}
      : {
          JSXOpeningElement(node: JSXOpeningElement) {
            if (
              node.name.type === "JSXIdentifier" &&
              accordionItemImport.local.name === node.name.name
            ) {
              context.report({
                node,
                message:
                  "The markup for AccordionItem has been updated, and it now renders a `div` element as a wrapper.",
              });
            }
          },
        };
  },
};
