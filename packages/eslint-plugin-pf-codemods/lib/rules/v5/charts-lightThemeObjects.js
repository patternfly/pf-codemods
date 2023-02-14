// https://github.com/patternfly/patternfly-react/pull/8590
module.exports = {
  meta: {},
  create: function (context) {
    return {
      ImportDeclaration(node) {
        const oldLightThemeObjects = [
          "LightBlueColorTheme",
          "LightCyanColorTheme",
          "LightGoldColorTheme",
          "LightGrayColorTheme",
          "LightGreenColorTheme",
          "LightMultiColorOrderedTheme",
          "LightMultiColorUnorderedTheme",
          "LightOrangeColorTheme",
          "LightPurpleColorTheme",
        ];
        const lightThemeImports = node.specifiers.find(
          (specifier) =>
            oldLightThemeObjects.includes(specifier.imported.name) &&
            /^@patternfly\/react-charts/.test(node.source.value)
        );

        if (lightThemeImports) {
          context.report({
            node,
            message: `The light theme objects from react-charts have been renamed to omit "Light" in the name. Rather than importing these objects directly, you must use the getTheme function from react-charts instead.`,
          });
        }
      },
    };
  },
};
