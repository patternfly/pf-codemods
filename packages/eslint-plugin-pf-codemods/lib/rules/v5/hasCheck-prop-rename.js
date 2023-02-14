const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8403
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const importsWithHasCheck = [
      ...getPackageImports(context, "@patternfly/react-core").filter(
        (specifier) =>
          ["MenuItem", "TreeView"].includes(specifier.imported.name)
      ),
      ...getPackageImports(context, "@patternfly/react-core/next").filter(
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
                  attribute.name && attribute.name.name === "hasCheck"
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
