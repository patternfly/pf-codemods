const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8174
module.exports = {
  create: function (context) {
    const imports = getPackageImports(context, "@patternfly/react-core").filter(
      (specifier) => specifier.imported.name === "KEY_CODES"
    );

    return imports.length == 0
      ? {}
      : {
          ImportDeclaration(node) {
            context.report({
              node,
              message:
                "The KEY_CODES constant has been removed. We suggest refactoring to use the KeyTypes constant instead.",
            });
          },
        };
  },
};
