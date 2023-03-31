const { ensureImports, getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8737
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const pfPackage = "@patternfly/react-core";
    const oldNames = ["EmptyStatePrimary", "EmptyStateSecondaryActions"];

    const imports = getPackageImports(context, pfPackage).filter((specifier) =>
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
            if (node.source.value != pfPackage) {
              return;
            }

            const allTokens = context
              .getSourceCode()
              .ast.body.filter((node) => node.type !== "ImportDeclaration")
              .map((node) =>
                context
                  .getSourceCode()
                  .getTokens(node)
                  .map((token) => token.value)
              )
              .reduce((acc, val) => acc.concat(val), []);

            imports
              .filter((spec) => !allTokens.includes(spec.local.name))
              .forEach((spec) =>
                context.report({
                  node,
                  message: `unused patternfly import ${spec.local.name}`,
                  fix(fixer) {
                    const getEndRange = () => {
                      const nextComma = context
                        .getSourceCode()
                        .getTokenAfter(spec);

                      return context.getSourceCode().getText(nextComma) === ","
                        ? context.getSourceCode().getTokenAfter(nextComma)
                            .range[0]
                        : spec.range[1];
                    };

                    return fixer.removeRange([spec.range[0], getEndRange()]);
                  },
                })
              );

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
