const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8293
module.exports = {
  meta: {},
  create: function (context) {
    const appLauncherImports = getPackageImports(
      context,
      "@patternfly/react-core"
    ).filter((specifier) => specifier.imported.name == "ApplicationLauncher");

    return appLauncherImports.length === 0
      ? {}
      : {
          ImportDeclaration(node) {
            context.report({
              node,
              message: `The internal input within ApplicationLauncher has been updated to use the PatternFly SearchInput.`,
            });
          },
        };
  },
};
