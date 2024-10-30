import { Rule } from "eslint";
import { JSXOpeningElement, MemberExpression } from "estree-jsx";
import {
  getFromPackage,
  getAttribute,
  getAttributeValue,
  getEnumPropertyName,
  isEnumValue,
} from "../../helpers";

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

    const renames = {
      "button-group": "action-group",
      "icon-button-group": "action-group-plain",
    };
    const oldVariantNames = Object.keys(renames);
    type OldVariantType = "button-group" | "icon-button-group";

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
              const variantValueAsEnum = variantValue as MemberExpression;

              const isEnumToRename =
                variantEnumImport &&
                isEnumValue(
                  context,
                  variantValueAsEnum,
                  variantEnumImport.local.name,
                  oldVariantNames
                );

              if (
                !oldVariantNames.includes(variantValue as string) &&
                !isEnumToRename
              ) {
                return;
              }

              const variantToRename = isEnumToRename
                ? (getEnumPropertyName(
                    context,
                    variantValueAsEnum
                  ) as OldVariantType)
                : (variantValue as OldVariantType);

              context.report({
                node,
                message: `The \`${variantToRename}\` variant of ${applicableComponent.imported.name} has been renamed to \`${renames[variantToRename]}\`.`,
                fix(fixer) {
                  return fixer.replaceText(
                    isEnumToRename ? variantValueAsEnum.property : variant,
                    isEnumToRename
                      ? `"${renames[variantToRename]}"`
                      : `variant="${renames[variantToRename]}"`
                  );
                },
              });
            }
          },
        };
  },
};
