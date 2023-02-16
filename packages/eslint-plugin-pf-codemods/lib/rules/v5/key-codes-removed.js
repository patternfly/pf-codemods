// https://github.com/patternfly/patternfly-react/pull/8174
module.exports = {
  create: function (context) {
    return {
      ImportDeclaration(node) {
        const keycode = /^@patternfly\/react-core/.test(node.source.value) &&
          node.specifiers.find(
            (specifier) => specifier.imported?.name === "KEY_CODES"
          );

        if (keycode) {
          context.report({
            node,
            message:
              "The KEY_CODES constant has been removed. We suggest refactoring to use the KeyTypes constant instead.",
          });
        }
      },
    };
  },
};
