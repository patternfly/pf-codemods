const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8737
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const package = "@patternfly/react-core";
    const imports = getPackageImports(context, package).filter((specifier) =>
      ["EmptyStatePrimary", "EmptyStateSecondaryActions"].includes(
        specifier.imported.name
      )
    );

    const importNames = Object.assign(
      {},
      ...imports.map((imp) => ({ [imp.local.name]: imp.imported.name }))
    );

    const newName = "EmptyStateActions";

    return imports.length == 0
      ? {}
      : {
          ImportDeclaration(node) {
            if (node.source.value != package) {
              return;
            }

            imports.forEach((imp) => {
              const getEndRange = () => {
                const nextComma = context.getSourceCode().getTokenAfter(imp);

                return context.getSourceCode().getText(nextComma) === ","
                  ? context.getSourceCode().getTokenAfter(nextComma).range[0]
                  : imp.range[1];
              };

              context.report({
                node,
                message: `${imp.imported.name} has been replaced with ${newName}`,
                fix(fixer) {
                  return imports.length === 2 &&
                    imp.imported.name === "EmptyStatePrimary" // remove one of the imports completely
                    ? fixer.replaceTextRange([imp.range[0], getEndRange()], "")
                    : fixer.replaceText(imp, newName);
                },
              });
            });
          },
          JSXElement(node) {
            const openingIdentifier = node.openingElement.name;

            if (openingIdentifier?.name in importNames) {
              context.report({
                node,
                message: `${
                  importNames[openingIdentifier.name]
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
