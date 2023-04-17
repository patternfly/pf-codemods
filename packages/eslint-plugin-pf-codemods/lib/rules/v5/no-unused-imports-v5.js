// Cleanup from other rules
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const sourceCode = context.getSourceCode();

    const allTokens = [
      ...new Set(
        sourceCode.ast.body
          .filter((node) => node.type !== "ImportDeclaration")
          .map((node) =>
            sourceCode
              .getTokens(node)
              .filter((token) =>
                ["JSXIdentifier", "Identifier"].includes(token.type)
              )
              .map((token) => token.value)
          )
          .flat()
      ),
    ];

    return {
      ImportDeclaration(node) {
        if (!/@patternfly\/react/.test(node.source.value)) {
          return;
        }

        const unusedImports = node.specifiers.filter(
          (spec) => !allTokens.includes(spec.local.name)
        );

        if (unusedImports.length === 0) {
          return;
        }

        context.report({
          node,
          message: `unused PatternFly import${
            unusedImports.length > 1 ? "s" : ""
          } ${unusedImports.map((spec) => spec.local.name).join(", ")} from '${
            node.source.value
          }'`,
          fix(fixer) {
            const getEndRange = (spec) => {
              const nextComma = sourceCode.getTokenAfter(spec);
              return nextComma.value === ","
                ? sourceCode.getTokenAfter(nextComma).range[0]
                : spec.range[1];
            };

            const removeWholeImport = () => {
              const tokenAfter = sourceCode.getTokenAfter(node);
              return [
                fixer.remove(node),
                ...(tokenAfter === ";" ? [fixer.remove(tokenAfter)] : []),
              ];
            };

            return unusedImports.length === node.specifiers.length
              ? removeWholeImport()
              : unusedImports.map((spec) =>
                  fixer.removeRange([spec.range[0], getEndRange(spec)])
                );
          },
        });
      },
    };
  },
};
