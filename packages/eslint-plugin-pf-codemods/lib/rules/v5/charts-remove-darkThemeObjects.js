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
        const darkThemeImport = node.specifiers.find(
          (specifier) =>
            /^@patternfly\/react-charts/.test(node.source.value) &&
            removedThemeObjects.includes(specifier.imported?.name)
        );

        if (darkThemeImport) {
          context.report({
            node,
            message:
              "All dark theme objects have been removed from react-charts.",
            fix(fixer) {
              if (node.specifiers.length === 1) {
                return fixer.remove(node);
              }

              const { range } = darkThemeImport;
              const prevToken = context
                .getSourceCode()
                .getTokenBefore(darkThemeImport);
              const nextToken = context
                .getSourceCode()
                .getTokenAfter(darkThemeImport);

              const rangeStart =
                prevToken.value === ","
                  ? prevToken.range[0]
                  : prevToken.range[1];
              const rangeEnd =
                prevToken.value === "{" && nextToken.value === ","
                  ? nextToken.range[1]
                  : range[1];
              return fixer.replaceTextRange([rangeStart, rangeEnd], "");
            },
          });
        }
      },
    };
  },
};
