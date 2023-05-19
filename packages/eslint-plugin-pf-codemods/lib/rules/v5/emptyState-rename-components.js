const {
  ensureImports,
  getFromPackage,
  pfPackageMatches,
} = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8737
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const pfPackage = "@patternfly/react-core";
    const oldNames = ["EmptyStatePrimary", "EmptyStateSecondaryActions"];

    const imports = getFromPackage(context, pfPackage).imports.filter((specifier) =>
      oldNames.includes(specifier.imported.name)
    );

    const importNames = Object.fromEntries(
      imports.map((imp) => [imp.local.name, imp.imported.name])
    );

    const newName = "EmptyStateActions";

    return imports.length == 0
      ? {}
      : {
          ImportDeclaration(node) {
            if (!pfPackageMatches(pfPackage, node.source.value)) {
              return;
            }

            ensureImports(context, node, pfPackage, [newName]);
          },
          JSXElement(node) {
            const openingIdentifier = node.openingElement.name;

            if (openingIdentifier?.name in importNames) {
              context.report({
                node,
                message: `${
                  importNames[openingIdentifier?.name]
                } has been replaced with ${newName}`,
                fix(fixer) {
                  return [
                    fixer.replaceText(openingIdentifier, newName),
                    ...(node.closingElement
                      ? [fixer.replaceText(node.closingElement.name, newName)]
                      : []),
                  ];
                },
              });
            }
          },
        };
  },
};
