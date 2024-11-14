import {
  getFromPackage,
  getAttribute,
  getAttributeValue,
  isEnumValue,
  attributeValueIsString,
} from "../../helpers";
import { Rule } from "eslint";
import { JSXOpeningElement, MemberExpression } from "estree-jsx";

// https://github.com/patternfly/patternfly-react/pull/9774
// https://github.com/patternfly/patternfly-react/pull/9848
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const pageSectionImport = imports.find(
      (specifier) => specifier.imported.name === "PageSection"
    );
    const pageSectionVariantImport = imports.find(
      (specifier) => specifier.imported.name === "PageSectionVariants"
    );
    const validValues = ["default", "secondary"];

    return !pageSectionImport
      ? {}
      : {
          JSXOpeningElement(node: JSXOpeningElement) {
            if (
              node.name.type === "JSXIdentifier" &&
              pageSectionImport.local.name === node.name.name
            ) {
              const variantProp = getAttribute(node, "variant");

              if (!variantProp || !variantProp.value) {
                return;
              }
              const variantValue = getAttributeValue(
                context,
                variantProp.value
              );
              const variantValueAsEnum = variantValue as MemberExpression;

              const hasPatternFlyEnum =
                pageSectionVariantImport &&
                variantValueAsEnum?.object &&
                context.getSourceCode().getText(variantValueAsEnum.object) ===
                  pageSectionVariantImport.local.name;

              if (
                !attributeValueIsString(variantProp.value) &&
                !hasPatternFlyEnum
              ) {
                return;
              }

              const isValidEnumValue =
                pageSectionVariantImport &&
                isEnumValue(
                  context,
                  variantValueAsEnum,
                  pageSectionVariantImport.local.name,
                  validValues
                );

              const hasValidValue =
                isValidEnumValue ||
                validValues.includes(variantValue as string);

              if (!hasValidValue) {
                context.report({
                  node,
                  message:
                    'The `variant` prop for PageSection now only accepts a value of "default" or "secondary". Running the fix for this rule will remove the prop so it uses the default value of "default".',
                  fix(fixer) {
                    return fixer.replaceText(variantProp, "");
                  },
                });
              }
            }
          },
        };
  },
};
