import { getFromPackage } from "../../helpers";
import { Rule } from "eslint";
import { JSXOpeningElement } from "estree-jsx";

// https://github.com/patternfly/patternfly-react/pull/10037
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const labelImport = imports.find(
      (specifier: { imported: { name: string } }) =>
        specifier.imported.name === "Label"
    );

    return !labelImport
      ? {}
      : {
          JSXOpeningElement(node: JSXOpeningElement) {
            if (
              node.name.type === "JSXIdentifier" &&
              labelImport.local.name === node.name.name
            ) {
              const isOverflowLabelAttribute = node.attributes.find(
                (attr) =>
                  attr.type === "JSXAttribute" &&
                  attr.name?.name === "isOverflowLabel"
              );

              if (isOverflowLabelAttribute) {
                const variantAttribute = node.attributes.find(
                  (attr) =>
                    attr.type === "JSXAttribute" &&
                    attr.name?.name === "variant"
                );

                const baseMessage =
                  'The `isOverflowLabel` prop for Label has been replaced with `variant="overflow"`.';

                context.report({
                  node,
                  message: variantAttribute
                    ? `${baseMessage} Running the fix for this rule will replace an existing \`variant\` prop (which had no effect if \`isOverflowLabel\` was used).`
                    : baseMessage,
                  fix: <Rule.ReportFixer>function (fixer) {
                    const fixes = [
                      fixer.replaceText(
                        isOverflowLabelAttribute,
                        'variant="overflow"'
                      ),
                    ];
                    if (variantAttribute) {
                      fixes.push(fixer.remove(variantAttribute));
                    }

                    return fixes;
                  },
                });
              }
            }
          },
        };
  },
};
