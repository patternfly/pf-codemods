const { getFromPackage } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8649
module.exports = {
  meta: {},
  create: function (context) {
    const applicableImports = [
      ...getFromPackage(context, "@patternfly/react-core").imports.filter(
        (specifier) =>
          [
            "Wizard",
            "MenuItem",
            "PageGroup",
            "PageNavigation",
            "ProgressStep",
          ].includes(specifier.imported.name)
      ),
      ...getFromPackage(context, "@patternfly/react-core/next").imports.filter(
        (specifier) => specifier.imported.name === "WizardBody"
      ),
    ];
    return !applicableImports.length
      ? {}
      : {
          JSXOpeningElement(node) {
            const { name: nodeName } = node.name;
            if (
              applicableImports.map((imp) => imp.local.name).includes(nodeName)
            ) {
              const getValidAria = (attributesToFind) =>
                node.attributes.find((attribute) =>
                  attributesToFind.includes(attribute.name?.name)
                );

              let validAria;
              switch (nodeName) {
                case "Wizard":
                  validAria = getValidAria([
                    "mainAriaLabel",
                    "mainAriaLabelledBy",
                  ]);
                  break;
                case "WizardBody":
                  validAria = getValidAria(["aria-label", "aria-labelledby"]);
                  break;
                case "MenuItem":
                case "PageGroup":
                case "PageNavigation":
                  validAria = getValidAria(["aria-label"]);
                  break;
              }

              let message = "";
              const wizardNodeText =
                nodeName === "Wizard" ? "Wizard's body" : nodeName;
              if (validAria || nodeName === "ProgressStep") {
                switch (nodeName) {
                  case "Wizard":
                  case "WizardBody":
                    message = `The "${validAria.name.name}" prop will now only be applied when the ${wizardNodeText} contents overflows and causes a scrollbar.`;
                    break;
                  case "MenuItem":
                    message = `If both the "aria-label" and "hasCheckbox" props are passed to MenuItem, the "aria-label" prop will now be applied to the internal <li> element. Otherwise "aria-label" will be applied to the element passed to the "component" prop.`;
                    break;
                  case "PageGroup":
                  case "PageNavigation":
                    message = `The "aria-label" prop will now only be applied to ${nodeName} if the "hasOverflowScroll" prop is true.`;
                    break;
                  case "ProgressStep":
                    message = `The internal "aria-labelledby" attribute for ProgressStep will now only be applied when the "popoverRender" prop is also passed.`;
                    break;
                }
              }

              if (["Wizard", "WizardBody"].includes(nodeName)) {
                message += `${
                  message ? " Additionally, the" : "The"
                } ${wizardNodeText} will now be given a tabindex of "0" when the contents overflows.`;
              }

              if (message) {
                context.report({
                  node,
                  message,
                });
              }
            }
          },
        };
  },
};
