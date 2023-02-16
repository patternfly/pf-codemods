// https://github.com/patternfly/patternfly-react/pull/8217
module.exports = {
  create: function (context) {
    return {
      ImportDeclaration(node) {
        const TabsImport = node.specifiers.find(
          (specifier) =>
            node.source.value === "@patternfly/react-core" &&
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
