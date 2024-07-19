import { Rule } from "eslint";
import { JSXOpeningElement, MemberExpression, Identifier } from "estree-jsx";
import { getFromPackage, getAttribute, getAttributeValue } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10649
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const componentImport = imports.find(
      (specifier) => specifier.imported.name === "ToolbarItem"
    );
    const enumImport = imports.find(
      (specifier) => specifier.imported.name === "ToolbarItemVariant"
    );

    return !componentImport
      ? {}
      : {
          MemberExpression(node: MemberExpression) {
            if (
              enumImport &&
              (node.object as Identifier).name === enumImport.local.name &&
              node.property.type === "Literal" &&
              node.property.value === "chip-group"
            ) {
              context.report({
                node,
                message:
                  'The "chip-group" variant for ToolbarItem has been replaced with "label-group".',
                fix(fixer) {
                  return fixer.replaceText(node.property, '"label-group"');
                },
              });
            }
          },
          JSXOpeningElement(node: JSXOpeningElement) {
            if (
              node.name.type === "JSXIdentifier" &&
              componentImport.local.name === node.name.name
            ) {
              const variant = getAttribute(node, "variant");
              if (!variant || !variant.value) {
                return;
              }

              const variantValue = getAttributeValue(context, variant.value);

              if (
                variant.value.type === "Literal" &&
                variantValue === "chip-group"
              ) {
                context.report({
                  node,
                  message:
                    'The "chip-group" variant for ToolbarItem has been replaced with "label-group".',
                  fix(fixer) {
                    return fixer.replaceText(variant, `variant="label-group"`);
                  },
                });
              }
            }
          },
        };
  },
};
