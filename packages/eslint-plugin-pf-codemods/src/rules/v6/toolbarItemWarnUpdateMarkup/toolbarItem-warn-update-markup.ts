import { Rule } from "eslint";
import { JSXOpeningElement } from "estree-jsx";
import { getFromPackage, getAttribute, getAttributeValue } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10378
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
                (variant.value.type === "Literal" &&
                  variantValue === "chip-group") ||
                (variant.value.type === "JSXExpressionContainer" &&
                  variantValue.property.value === "chip-group" &&
                  variantValue.object.name === enumImport?.local.name)
              ) {
                context.report({
                  node,
                  message:
                    'The classname applied to the ToolbarItem when its variant is "chip-group" has been updated from `pf-m-chip-group` to `pf-m-label-group`.',
                });
              }
            }
          },
        };
  },
};
