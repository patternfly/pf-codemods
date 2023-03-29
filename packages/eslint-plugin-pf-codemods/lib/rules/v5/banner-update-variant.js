const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/issues/8204
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const bannerImport = getPackageImports(
      context,
      "@patternfly/react-core"
    ).find((specifier) => specifier.imported.name == "Banner");

    const variantMap = {
      info: "blue",
      danger: "red",
      warning: "gold",
      success: "green",
    };

    return !bannerImport
      ? {}
      : {
          JSXOpeningElement(node) {
            if (bannerImport.local.name === node.name.name) {
              const variantProp = node.attributes.find(
                (attribute) => attribute.name.name === "variant"
              );

              if (
                variantProp &&
                (variantMap[variantProp.value?.value] ||
                  variantProp.value?.type !== "Literal")
              ) {
                context.report({
                  node,
                  message: `The "variant" prop type for Banner has been updated. "default" is still a valid value, but the previous status values of "info", "success", "warning", and "danger" have been replaced with color values of "blue", "green", "gold", and "red", respectively.`,
                  fix(fixer) {
                    const fixes = [];

                    if (variantMap[variantProp.value.value]) {
                      fixes.push(
                        fixer.replaceText(
                          variantProp.value,
                          `"${variantMap[variantProp.value.value]}"`
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
