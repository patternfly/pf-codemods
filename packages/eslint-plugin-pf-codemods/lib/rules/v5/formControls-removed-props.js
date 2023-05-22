const { getFromPackage, renamePropsOnNode } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/9132
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const formControlImports = getFromPackage(
      context,
      "@patternfly/react-core"
    ).imports.filter((specifier) =>
      ["FormSelect", "TextArea", "TextInput"].includes(specifier.imported.name)
    );

    return !formControlImports.length
      ? {}
      : {
          JSXOpeningElement(node) {
            if (
              !formControlImports
                .map((imp) => imp.local?.name)
                .includes(node.name?.name)
            ) {
              return;
            }

            renamePropsOnNode(context, formControlImports, node, {
              FormSelect: {
                isIconSprite: "",
              },
              TextArea: {
                isIconSprite: "",
              },
              TextInput: {
                isIconSprite: "",
                iconVariant: {
                  newName: "",
                  message: `"iconVariant" prop on TextInput has been removed. We recommend using the customIcon prop instead.`,
                },
                customIconUrl: {
                  newName: "",
                  message: `"customIconUrl" prop on TextInput has been removed. We recommend using the customIcon prop instead.`,
                },
                customIconDimensions: "",
              },
            });

            const isReadOnlyProp = node.attributes.find(
              (attr) => attr.name?.name === "isReadOnly"
            );

            if (isReadOnlyProp) {
              const readOnlyVariantProp = node.attributes.find(
                (attr) => attr.name?.name === "readOnlyVariant"
              );

              context.report({
                node,
                message: `"isReadOnly" prop on ${node.name?.name} has been removed and should be replaced with the "readOnlyVariant" prop.`,
                fix(fixer) {
                  const fixes = [fixer.remove(isReadOnlyProp)];

                  if (!readOnlyVariantProp) {
                    fixes.push(
                      fixer.insertTextAfter(
                        node.attributes[node.attributes.length - 1],
                        ' readOnlyVariant="default"'
                      )
                    );
                  }

                  return fixes;
                },
              });
            }
          },
        };
  },
};
