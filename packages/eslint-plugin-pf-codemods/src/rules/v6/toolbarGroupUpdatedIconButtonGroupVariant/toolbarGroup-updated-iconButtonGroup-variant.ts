import { Rule } from "eslint";
import { JSXOpeningElement } from "estree-jsx";
import { getFromPackage, getAttribute, getAttributeValue } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10674
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const componentImports = imports.filter((specifier) =>
      ["ToolbarGroup", "ToolbarToggleGroup"].includes(specifier.imported.name)
    );
    const variantEnumImport = imports.find(
      (specifier) => specifier.imported.name === "ToolbarGroupVariant"
    );

    return !componentImports.length
      ? {}
      : {
          JSXOpeningElement(node: JSXOpeningElement) {
            const applicableComponent = componentImports.find(
              (imp) =>
                node.name.type === "JSXIdentifier" &&
                imp.local.name === node.name.name
            );

            if (applicableComponent) {
              const variant = getAttribute(node, "variant");
              if (!variant || !variant.value) {
                return;
              }

              const variantValue = getAttributeValue(context, variant.value);
              const isEnumValueIconButtonGroup =
                variantEnumImport &&
                variantValue.object?.name === variantEnumImport.local.name &&
                variantValue.property.value === "icon-button-group";
              if (
                variantValue !== "icon-button-group" &&
                !isEnumValueIconButtonGroup
              ) {
                return;
              }

              context.report({
                node,
                message: `The \`icon-button-group\` variant of ${applicableComponent.imported.name} has been renamed to \`action-group-plain\`.`,
                fix(fixer) {
                  return fixer.replaceText(
                    isEnumValueIconButtonGroup
                      ? variantValue.property
                      : variant,
                    isEnumValueIconButtonGroup
                      ? '"action-group-plain"'
                      : 'variant="action-group-plain"'
                  );
                },
              });
            }
          },
        };
  },
};
