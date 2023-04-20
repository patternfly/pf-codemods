const { pfPackageMatches } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8409
module.exports = {
  create: function (context) {
    return {
      ImportDeclaration(node) {
        const wizardImport = node.specifiers.find(
          (specifier) =>
            (pfPackageMatches("@patternfly/react-core", node.source.value) &&
              specifier.imported?.name === "Wizard") ||
            (pfPackageMatches("@patternfly/react-core/next", node.source.value) &&
              specifier.imported?.name === "WizardFooter")
        );

        if (wizardImport) {
          context.report({
            node,
            message: `The order of the "next" and "back" buttons in the ${
              wizardImport.imported.name === "WizardFooter"
                ? "WizardFooter"
                : "Wizard"
            } has been updated, with the "next" button now coming after the "back" button.`,
          });
        }
      },
    };
  },
};
