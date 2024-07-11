import { Rule } from "eslint";
import { ImportDeclaration } from "estree-jsx";
import { getEndRange } from "../../helpers";

// Cleanup from other rules
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
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
      ImportDeclaration(node: ImportDeclaration) {
        if (!/@patternfly\/react/.test(node.source.value?.toString() || "")) {
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
          message: `Unused PatternFly import${
            unusedImports.length > 1 ? "s" : ""
          } ${unusedImports.map((spec) => spec.local.name).join(", ")} from '${
            node.source.value
          }' should be removed`,
          fix(fixer) {
            if (unusedImports.length === node.specifiers.length) {
              return fixer.remove(node);
            }

            const fixers = unusedImports.map((spec) => {
              const startRange = spec.range?.[0];
              const endRange = getEndRange(sourceCode, spec);

              // only add a fixer if it actually has a start and end of its range
              // needed because spec.range can be undefined
              if (startRange && endRange) {
                return fixer.removeRange([startRange, endRange]);
              }
            });

            // remove any undefined entries from the previous map before returning as fix()
            // expects the array to only contain valid fixes
            return fixers.filter((fix) => fix !== undefined) as Rule.Fix[];
          },
        });
      },
    };
  },
};
