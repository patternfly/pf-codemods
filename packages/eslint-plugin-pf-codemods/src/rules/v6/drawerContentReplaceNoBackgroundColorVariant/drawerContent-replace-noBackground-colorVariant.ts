import { Rule } from "eslint";
import { JSXOpeningElement, MemberExpression } from "estree-jsx";
import { getFromPackage, getAttribute, getAttributeValue } from "../../helpers";

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
            const drawerColorVariantLocalName =
              drawerColorVariantEnumImport &&
              drawerColorVariantEnumImport.local.name;
            const hasPatternFlyEnum =
              colorVariantValue &&
              colorVariantValue.object &&
              colorVariantValue.object.name === drawerColorVariantLocalName;
            const hasNoBackgroundValue =
              colorVariantValue && colorVariantValue.property
                ? hasPatternFlyEnum &&
                  colorVariantValue.property.name === "noBackground"
                : colorVariantValue === "no-background";

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
                  const enumPropertyName = colorVariantValue.property.name;
                  fixes.push(
                    fixer.replaceText(
                      colorVariantProp,
                      validDrawerContentValues.includes(enumPropertyName)
                        ? `colorVariant="${colorVariantValue.property.name}"`
                        : ""
                    )
                  );
                }

                if (!hasNoBackgroundValue && !hasPatternFlyEnum) {
                  fixes.push(
                    fixer.replaceText(
                      colorVariantProp,
                      `colorVariant="${colorVariantValue}"`
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
