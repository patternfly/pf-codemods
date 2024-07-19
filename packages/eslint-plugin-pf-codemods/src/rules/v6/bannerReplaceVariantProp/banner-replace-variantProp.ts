import { Rule } from "eslint";
import { JSXOpeningElement } from "estree-jsx";
import { getFromPackage, getAttribute, getAttributeValue } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/9891
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const bannerImport = imports.find(
      (specifier) => specifier.imported.name === "Banner"
    );

    return !bannerImport
      ? {}
      : {
          JSXOpeningElement(node: JSXOpeningElement) {
            if (
              node.name.type === "JSXIdentifier" &&
              bannerImport.local.name === node.name.name
            ) {
              const attribute = getAttribute(node, "variant");
              if (!attribute) {
                return;
              }
              const attributeValue = getAttributeValue(
                context,
                attribute.value
              );
              const isValueDefault = attributeValue === "default";
              const fixMessage = isValueDefault
                ? "remove the variant property"
                : "replace the variant property with the color property";

              context.report({
                node,
                message: `The variant property has been removed from Banner. We recommend using our new color or status properties, depending on the original intent of the variant property. Running the fix for this rule will ${fixMessage}, but additional manual updates may need to be made.`,
                fix(fixer) {
                  if (isValueDefault) {
                    return fixer.replaceText(attribute, "");
                  }

                  return fixer.replaceText(attribute.name, "color");
                },
              });
            }
          },
        };
  },
};
