const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8409
module.exports = {
  create: function (context) {
    return {
      ImportDeclaration(node) {
        const wizardImport = node.specifiers.find((specifier) =>
          ["Wizard", "WizardFooter"].includes(specifier.imported.name)
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
