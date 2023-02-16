// https://github.com/patternfly/patternfly-react/pull/8409
module.exports = {
  create: function (context) {
    return {
      ImportDeclaration(node) {
        const wizardImport = node.specifiers.find(
          (specifier) =>
            (node.source.value === "@patternfly/react-core" &&
              specifier.imported?.name === "Wizard") ||
            (node.source.value === "@patternfly/react-core/next" &&
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
