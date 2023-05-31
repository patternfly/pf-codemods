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
              const tokenAfter = sourceCode.getTokenAfter(spec);
              const commentsAfter = sourceCode.getCommentsAfter(spec);

              if (tokenAfter.value === ",") {
                return sourceCode.getTokenAfter(tokenAfter).range[0];
              }

              if (commentsAfter?.length) {
                return commentsAfter[commentsAfter.length - 1].range[1];
              }

              return spec.range[1];
            };

            return unusedImports.length === node.specifiers.length
              ? fixer.remove(node)
              : unusedImports.map((spec) =>
                  fixer.removeRange([spec.range[0], getEndRange(spec)])
                );
          },
        });
      },
    };
  },
};
