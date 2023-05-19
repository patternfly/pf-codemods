const { getFromPackage } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8293
module.exports = {
  meta: {},
  create: function (context) {
    const appLauncherImports = getFromPackage(
      context,
      "@patternfly/react-core"
    ).imports.filter((specifier) => specifier.imported.name == "ApplicationLauncher");

    return appLauncherImports.length === 0
      ? {}
      : {
          ImportDeclaration(node) {
            if (
              node.specifiers.filter((specifier) =>
                appLauncherImports
                  .map((imp) => imp.imported.name)
                  .includes(specifier?.imported?.name)
              ).length
            ) {
              context.report({
                node,
                message: `The internal input within ApplicationLauncher has been updated to use the PatternFly SearchInput. Any relative selectors, such as in unit tests, may need to be updated.`,
              });
            }
          },
        };
  },
};
