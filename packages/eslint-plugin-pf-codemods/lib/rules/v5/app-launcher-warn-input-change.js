const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8293
module.exports = {
  create: function (context) {
    return {
      ImportDeclaration(node) {
        const appLauncherImport = node.specifiers.find(
          (specifier) =>
            specifier.imported.name === "ApplicationLauncher" &&
            node.source.value === "@patternfly/react-core"
        );

        if (appLauncherImport) {
          context.report({
            node,
            message: "The input in ApplicationLauncher has been replaced with our SearchInput component. You may need to update unit tests or other references to the input.",
          });
        }
      },
    };
  },
};

