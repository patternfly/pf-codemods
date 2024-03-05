import { getFromPackage, findAncestor } from "../../helpers";
import { Rule } from "eslint";
import { JSXElement, JSXOpeningElement } from "estree-jsx";

// https://github.com/patternfly/patternfly-react/pull/9876
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const accordionToggleImport = imports.find(
      (specifier: { imported: { name: string } }) =>
        specifier.imported.name === "AccordionToggle"
    );

    return !accordionToggleImport
      ? {}
      : {
          JSXOpeningElement(node: JSXOpeningElement) {
            if (
              node.name.type === "JSXIdentifier" &&
              accordionToggleImport.local.name === node.name.name
            ) {
              const attribute = node.attributes.find(
                (attr) =>
                  attr.type === "JSXAttribute" &&
                  attr.name.name === "isExpanded"
              );

              if (!attribute) {
                return;
              }

              context.report({
                node,
                message:
                  "The `isExpanded` prop for AccordionToggle has been moved to AccordionItem.",
                fix(fixer) {
                  const accordionItemAncestor = findAncestor(
                    node,
                    (current) =>
                      current.type === "JSXElement" &&
                      current.openingElement.name.type === "JSXIdentifier" &&
                      current.openingElement.name.name === "AccordionItem"
                  ) as JSXElement | undefined;
                  const attributeValue = context
                    .getSourceCode()
                    .getText(attribute);

                  return accordionItemAncestor
                    ? [
                        fixer.replaceText(attribute, ""),
                        fixer.insertTextAfter(
                          accordionItemAncestor.openingElement.name,
                          ` ${attributeValue}`
                        ),
                      ]
                    : [];
                },
              });
            }
          },
        };
  },
};
