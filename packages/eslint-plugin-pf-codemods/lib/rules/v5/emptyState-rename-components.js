const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8737
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const oldNames = ["EmptyStatePrimary", "EmptyStateSecondaryActions"];
    const newName = "EmptyStateActions";

    const package = "@patternfly/react-core";
    const imports = getPackageImports(context, package).filter((specifier) =>
      oldNames.includes(specifier.imported.name)
    );

    return imports.length == 0
      ? {}
      : {
          ImportDeclaration(node) {
            if (node.source.value != package) {
              return;
            }

            const hasAlias = (imp) => imp.imported.name !== imp.local.name;

            const redundantImports =
              imports.length === 2 && imports.every((imp) => !hasAlias(imp));

            const newImportText = (imp) => {
              const aliasText = hasAlias(imp) ? ` as ${imp.local.name}` : "";
              return `${newName}${aliasText}`;
            };

            imports.forEach((imp) => {
              const getEndRange = () => {
                const nextComma = context
                  .getSourceCode()
                  .getTokenAfter(imp);

                return context.getSourceCode().getText(nextComma) === ","
                  ? nextComma.range[1]
                  : imp.range[1];
              };
              
              context.report({
                node,
                message: `${imp.imported.name} has been replaced with ${newName}`,
                fix(fixer) {
                  return redundantImports &&
                    imp.imported.name === "EmptyStatePrimary" // remove one of the imports completely
                    ? fixer.replaceTextRange([imp.range[0], getEndRange()], "")
                    : fixer.replaceText(imp, newImportText(imp));
                },
              });
            });
          },
          JSXElement(node) {
            const openingIdentifier = node.openingElement.name;

            if (oldNames.includes(openingIdentifier?.name)) {
              context.report({
                node,
                message: `${openingIdentifier.name} has been replaced with ${newName}`,
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
