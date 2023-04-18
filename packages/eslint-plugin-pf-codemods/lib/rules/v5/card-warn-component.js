const { pfPackageMatches } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8601
module.exports = {
  create: function (context) {
    return {
      ImportDeclaration(node) {
        const cardImport = node.specifiers.find(
          (specifier) =>
            (pfPackageMatches("@patternfly/react-core", node.source.value) &&
              specifier.imported?.name === "Card")
        );

        if (cardImport) {
          context.report({
            node,
            message: `The internal default value of the component prop within Card has been changed from 'article' to 'div'. Any related references, such as in unit tests, may need to be updated.`
          });
        }
      },
    };
  },
};
