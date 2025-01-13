import { Rule } from "eslint";
import { JSXOpeningElement } from "estree-jsx";
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

              const { value: variantValue, type: variantType } =
                getAttributeValue(context, variant.value);
              const variantValueEnum =
                variantType === "MemberExpression" ? variantValue : null;

              const isEnumToRename =
                variantEnumImport &&
                variantValueEnum &&
                isEnumValue(
                  context,
                  variantValueEnum,
                  variantEnumImport.local.name,
                  oldVariantNames
                );

              if (
                !(
                  variantType === "string" &&
                  oldVariantNames.includes(variantValue)
                ) &&
                !isEnumToRename
              ) {
                return;
              }

              const variantToRename = isEnumToRename
                ? (getEnumPropertyName(
                    context,
                    variantValueEnum
                  ) as OldVariantType)
                : (variantValue as OldVariantType);

              context.report({
                node,
                message: `The \`${variantToRename}\` variant of ${applicableComponent.imported.name} has been renamed to \`${renames[variantToRename]}\`.`,
                fix(fixer) {
                  return fixer.replaceText(
                    isEnumToRename ? variantValueEnum.property : variant,
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
