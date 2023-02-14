// https://github.com/patternfly/patternfly-react/pull/8590
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    return {
      ImportDeclaration(node) {
        const removedThemeObjects = [
          "DarkBlueColorTheme",
          "DarkCyanColorTheme",
          "DarkGoldColorTheme",
          "DarkGrayColorTheme",
          "DarkGreenColorTheme",
          "DarkMultiColorOrderedTheme",
          "DarkMultiColorUnorderedTheme",
          "DarkOrangeColorTheme",
          "DarkPurpleColorTheme",
        ];
        const darkThemeImports = node.specifiers.find(
          (specifier) =>
            removedThemeObjects.includes(specifier.imported.name) &&
            /^@patternfly\/react-charts/.test(node.source.value)
        );

        if (darkThemeImports) {
          context.report({
            node,
            message:
              "All dark theme objects have been removed from react-charts.",
            fix(fixer) {
              if (node.specifiers.length === 1) {
                return fixer.remove(node);
              }

              const { range } = darkThemeImports;
              const nextToken = context
                .getSourceCode()
                .getTokenAfter(darkThemeImports);
              const rangeEnd =
                nextToken && nextToken.value === "," ? range[1] + 1 : range[1];
              return fixer.replaceTextRange([range[0], rangeEnd], "");
            },
          });
        }
      },
    };
  },
};
