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

    const { imports, exports } = getFromPackage(context, pfPackage);
    const emptyStateImports = imports.filter((specifier) =>
      oldNames.includes(specifier.imported.name)
    );
    const emptyStateExports = exports.filter((specifier) =>
      oldNames.includes(specifier.local.name)
    );

    const importNames = Object.fromEntries(
      emptyStateImports.map((imp) => [imp.local.name, imp.imported.name])
    );

    const newName = "EmptyStateActions";
    const emptyStateFunctions = {};

    return !emptyStateImports.length && !emptyStateExports.length
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
          ExportNamedDeclaration(node) {
            if (!emptyStateExports.length) {
              return;
            }
            const applicableExports = node.specifiers.filter((specifier) =>
              emptyStateExports
                .map((exp) => exp.local.name)
                .includes(specifier.local.name)
            );

            if (applicableExports.length) {
              applicableExports.forEach((exp) => {
                context.report({
                  node,
                  message: `${exp.local.name} has been replaced with ${newName}`,
                  fix(fixer) {
                    return fixer.replaceText(exp.local, newName);
                  },
                });
              });
            }
          },
        };
  },
};
