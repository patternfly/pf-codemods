import { getFromPackage } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10037
module.exports = {
  meta: { fixable: "code" },
  create: function (context: {
    report: (arg0: {
      node: any;
      message: string;
      fix(fixer: any): any;
    }) => void;
  }) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const labelImport = imports.find(
      (specifier: { imported: { name: string } }) =>
        specifier.imported.name === "Label"
    );

    return !labelImport
      ? {}
      : {
          JSXOpeningElement(node: { name: { name: any }; attributes: any[] }) {
            if (labelImport.local.name === node.name.name) {
              const isOverflowLabelAttribute = node.attributes.find(
                (attr: { name: { name: string } }) =>
                  attr.name?.name === "isOverflowLabel"
              );

              if (isOverflowLabelAttribute) {
                const variantAttribute = node.attributes.find(
                  (attr: { name: { name: string } }) =>
                    attr.name?.name === "variant"
                );

                const baseMessage =
                  'The `isOverflowLabel` prop for Label has been replaced with `variant="overflow"`.';

                context.report({
                  node,
                  message: variantAttribute
                    ? `${baseMessage} Running the fix for this rule will replace an existing \`variant\` prop (which had no effect if \`isOverflowLabel\` was used).`
                    : baseMessage,
                  fix(fixer: {
                    replaceText: (arg0: any, arg1: string) => any;
                    remove: (arg0: any) => any;
                  }) {
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
