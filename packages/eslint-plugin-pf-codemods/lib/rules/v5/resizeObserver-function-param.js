const { getFromPackage } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8324
module.exports = {
  meta: { hasSuggestions: true },
  create: function (context) {
    const imports = getFromPackage(context, "@patternfly/react-core").imports.filter(
      (specifier) => specifier.imported.name === "getResizeObserver"
    );

    return imports.length == 0
      ? {}
      : {
          CallExpression(node) {
            if (
              node.callee.name === "getResizeObserver" &&
              node.arguments.length !== 3
            ) {
              context.report({
                node,
                message: `A third parameter, useRequestAnimationFrame, has been added to the getResizeObserver function.`,
                suggest: [
                  {
                    desc: "Omit the third argument or pass in a value of false when the callback passed in is debounced. This is the new default functionality.",
                    fix: function (fixer) {
                      const lastToken = context.getLastToken(node);
                      const fixes = [
                        fixer.insertTextBefore(lastToken, ", false"),
                      ];
                      return fixes;
                    },
                  },
                  {
                    desc: "Pass in a value of true if the callback passed in is not debounced. This maintains the previous functionality.",
                    fix: function (fixer) {
                      const lastToken = context.getLastToken(node);
                      const fixes = [
                        fixer.insertTextBefore(lastToken, ", true"),
                      ];
                      return fixes;
                    },
                  },
                ],
              });
            }
          },
        };
  },
};
