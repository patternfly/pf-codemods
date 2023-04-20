const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8931
module.exports = {
  meta: {},
  create: function (context) {
    const aboutModalImport = getPackageImports(
      context,
      "@patternfly/react-core"
    ).find((specifier) => specifier.imported.name === "AboutModal");

    return !aboutModalImport
      ? {}
      : {
          ImportDeclaration(node) {
            if (
              node.specifiers.find(
                (specifier) =>
                  specifier.local.name === aboutModalImport.local.name
              )
            ) {
              context.report({
                node,
                message:
                  "The AboutModalBoxHero sub-component has been removed from AboutModal. Selectors in tests may need to be updated.",
              });
            }
          },
        };
  },
};
