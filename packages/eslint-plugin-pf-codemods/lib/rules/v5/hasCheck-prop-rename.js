const { getFromPackage } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8403
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const importsWithHasCheck = [
      ...getFromPackage(context, "@patternfly/react-core").imports.filter(
        (specifier) =>
          ["MenuItem", "TreeView"].includes(specifier.imported.name)
      ),
      ...getFromPackage(context, "@patternfly/react-core/next").imports.filter(
        (specifier) => specifier.imported.name === "SelectOption"
      ),
    ];

    return importsWithHasCheck.length === 0
      ? {}
      : {
          JSXOpeningElement(node) {
            if (
              importsWithHasCheck
                .map((imp) => imp.local.name)
                .includes(node.name.name)
            ) {
              const hasCheckAttribute = node.attributes.find(
                (attribute) =>
                  attribute.name?.name === "hasCheck"
              );

              if (hasCheckAttribute) {
                context.report({
                  node,
                  message: `The 'hasCheck' prop for ${node.name.name} has been renamed to 'hasCheckbox'.`,
                  fix(fixer) {
                    return fixer.replaceTextRange(
                      hasCheckAttribute.range,
                      "hasCheckbox"
                    );
                  },
                });
              }
            }
          },
        };
  },
};
