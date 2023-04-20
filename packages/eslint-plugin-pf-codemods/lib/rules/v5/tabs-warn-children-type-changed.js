const { pfPackageMatches } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/8217
module.exports = {
  create: function (context) {
    return {
      ImportDeclaration(node) {
        const TabsImport = node.specifiers.find(
          (specifier) =>
            pfPackageMatches("@patternfly/react-core", node.source.value) &&
            specifier.imported?.name === "Tabs"
        );

        if (TabsImport) {
          context.report({
            node,
            message: "The children of the 'Tabs' component must now be passed a 'Tab' component or a falsy value.",
          });
        }
      },
    };
  },
};
