const { getFromPackage } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8737
module.exports = {
  meta: {fixable: "code"},
  create: function (context) {

    const emptyStateVariantImport = getFromPackage(
      context,
      "@patternfly/react-core"
    ).imports.some(
      (specifier) => specifier.imported.name === "EmptyStateVariant"
    );

    const emptyStateImport = getFromPackage(
      context,
      "@patternfly/react-core"
    ).imports.find((specifier) => specifier.imported.name === "EmptyState");

    const rename = {
      small: "sm",
      large: "lg",
    };

    return !emptyStateVariantImport && !emptyStateImport
      ? {}
      : {
          MemberExpression(node) {
            if (
              node.object?.name === "EmptyStateVariant" &&
              [node.object?.type, node.property?.type].every(
                (type) => type === "Identifier"
              )
            ) {
              const variantName = node.property.name;

              const rename = {
                small: "sm",
                large: "lg",
              };

              if (!(variantName in rename)) {
                return {};
              }

              context.report({
                node,
                message: `EmptyStateVariant enum value '${variantName}' was renamed to '${rename[variantName]}'`,
                fix(fixer) {
                  return fixer.replaceText(node.property, rename[variantName]);
                },
              });
            }
          },
          JSXOpeningElement(node) {
            if (emptyStateImport.local.name === node.name.name) {
              const variantProp = node.attributes.find(
                (attribute) => attribute.name?.name === "variant"
              );

              if (variantProp && rename[variantProp.value?.value]) {
                context.report({
                  node,
                  message: `The "variant" prop type for EmptyState has been updated. The previous values of "small" and "large" have been replaced with values of "sm" and "lg" respectively.`,
                  fix(fixer) {
                    const fixes = [];

                    if (rename[variantProp.value.value]) {
                      fixes.push(
                        fixer.replaceText(
                          variantProp.value,
                          `"${rename[variantProp.value.value]}"`
                        )
                      );
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
