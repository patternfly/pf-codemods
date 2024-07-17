import { Rule } from "eslint";
import { JSXOpeningElement } from "estree-jsx";
import { getFromPackage, getAttribute, getAttributeValue } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10637
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const wizardStepImport = imports.find(
      (specifier) => specifier.imported.name === "WizardStep"
    );

    return !wizardStepImport
      ? {}
      : {
          JSXOpeningElement(node: JSXOpeningElement) {
            if (
              node.name.type === "JSXIdentifier" &&
              wizardStepImport.local.name === node.name.name
            ) {
              const bodyProp = getAttribute(node, "body");
              if (!bodyProp) {
                return;
              }
              const bodyValue = getAttributeValue(context, bodyProp.value);

              if (bodyValue === null) {
                context.report({
                  node,
                  message: `The \`body\` prop on WizardStep no longer accepts a value of "null".`,
                  fix(fixer) {
                    return fixer.replaceText(bodyProp, "");
                  },
                });
              }
            }
          },
        };
  },
};
