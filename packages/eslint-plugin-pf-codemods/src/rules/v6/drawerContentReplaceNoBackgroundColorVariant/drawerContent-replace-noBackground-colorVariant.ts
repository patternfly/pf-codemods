import { Rule } from "eslint";
import { JSXOpeningElement, MemberExpression } from "estree-jsx";
import {
  getFromPackage,
  getAttribute,
  getAttributeValue,
  isEnumValue,
  getEnumPropertyName,
} from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10211
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const drawerContentImport = imports.find(
      (specifier) => specifier.imported.name === "DrawerContent"
    );
    const drawerColorVariantEnumImport = imports.find(
      (specifier) => specifier.imported.name === "DrawerColorVariant"
    );
    const validDrawerContentValues = ["default", "primary", "secondary"];

    return !drawerContentImport
      ? {}
      : {
          JSXOpeningElement(node: JSXOpeningElement) {
            if (
              !(
                node.name.type === "JSXIdentifier" &&
                drawerContentImport.local.name === node.name.name
              )
            ) {
              return;
            }
            const colorVariantProp = getAttribute(node, "colorVariant");

            if (!colorVariantProp) {
              return;
            }

            const colorVariantValue = getAttributeValue(
              context,
              colorVariantProp.value
            );

            const colorVariantValueAsEnum =
              colorVariantValue as MemberExpression;

            const hasPatternFlyEnum =
              drawerColorVariantEnumImport &&
              colorVariantValueAsEnum &&
              colorVariantValueAsEnum.object &&
              context
                .getSourceCode()
                .getText(colorVariantValueAsEnum.object) ===
                drawerColorVariantEnumImport.local.name;

            const isNoBackgroundEnum =
              !!drawerColorVariantEnumImport &&
              isEnumValue(
                context,
                colorVariantValueAsEnum,
                drawerColorVariantEnumImport.local.name,
                "noBackground"
              );

            const hasNoBackgroundValue =
              colorVariantValue === "no-background" || isNoBackgroundEnum;

            if (!hasPatternFlyEnum && !hasNoBackgroundValue) {
              return;
            }

            const message = hasNoBackgroundValue
              ? 'The "no-background" value of the `colorVariant` prop on DrawerContent has been removed.'
              : "The DrawerContentColorVariant enum should be used instead of the DrawerColorVariant enum when passed to the DrawerContent component. This fix will replace the colorVariant prop value with a string.";
            context.report({
              node,
              message,
              fix(fixer) {
                const fixes = [];
                if (hasNoBackgroundValue) {
                  fixes.push(fixer.replaceText(colorVariantProp, ""));
                }

                if (!hasNoBackgroundValue && hasPatternFlyEnum) {
                  const enumPropertyName = getEnumPropertyName(
                    context,
                    colorVariantValueAsEnum
                  );
                  enumPropertyName &&
                    fixes.push(
                      fixer.replaceText(
                        colorVariantProp,
                        validDrawerContentValues.includes(enumPropertyName)
                          ? `colorVariant="${enumPropertyName}"`
                          : ""
                      )
                    );
                }
                return fixes;
              },
            });
          },
        };
  },
};
