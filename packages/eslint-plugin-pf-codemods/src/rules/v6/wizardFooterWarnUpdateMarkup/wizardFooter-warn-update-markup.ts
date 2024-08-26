import { Rule } from "eslint";
import { JSXElement } from "estree-jsx";
import {
  getFromPackage,
  getAttribute,
  getAllChildJSXElementsByName,
} from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10378
module.exports = {
  meta: {},
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const wizardImport = imports.find(
      (specifier) => specifier.imported.name === "Wizard"
    );
    const wizardStepImport = imports.find(
      (specifier) => specifier.imported.name === "WizardStep"
    );

    return !wizardImport
      ? {}
      : {
          JSXElement(node: JSXElement) {
            if (
              node.openingElement.name.type === "JSXIdentifier" &&
              wizardImport.local.name === node.openingElement.name.name
            ) {
              const wizardFooterProp = getAttribute(node, "footer");
              const wizardSteps = wizardStepImport
                ? getAllChildJSXElementsByName(
                    node,
                    wizardStepImport.local.name
                  )
                : undefined;
              const allWizardStepsHaveFooter = wizardSteps
                ? (wizardSteps as JSXElement[]).every((step) =>
                    getAttribute(step, "footer")
                  )
                : false;

              if (wizardFooterProp || allWizardStepsHaveFooter) {
                return;
              }

              context.report({
                node,
                message:
                  "The default WizardFooter now uses an ActionList wrapped around our Button components, rather than just our Button components.",
              });
            }
          },
        };
  },
};
