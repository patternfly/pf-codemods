const { getFromPackage } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8737
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const includesEmptyStateVariant = getFromPackage(
      context,
      "@patternfly/react-core"
    ).imports.some((specifier) => specifier.imported.name === "EmptyStateVariant");

    return !includesEmptyStateVariant
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
        };
  },
};
