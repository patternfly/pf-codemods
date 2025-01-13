import { Rule } from "eslint";
import { JSXOpeningElement } from "estree-jsx";
import { getFromPackage, getAttribute, getAttributeValue } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10378
module.exports = {
  meta: {},
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const componentImport = imports.find(
      (specifier) => specifier.imported.name === "WizardNavItem"
    );

    return !componentImport
      ? {}
      : {
          JSXOpeningElement(node: JSXOpeningElement) {
            if (
              node.name.type === "JSXIdentifier" &&
              componentImport.local.name === node.name.name
            ) {
              const baseMessage =
                "There is now a wrapper element with class `pf-v6-c-wizard__nav-link-main` rendered around the nav item content.";
              const messageForErrorStatus =
                'Additionally, when the nav item has a status of "error" the icon will be rendered before the item content, and the WizardToggle will also now render an error icon.';
              const statusProp = getAttribute(node, "status");
              const statusValue =
                statusProp &&
                getAttributeValue(context, statusProp.value).value;

              context.report({
                node,
                message: `${baseMessage}${
                  statusValue === "error" ? ` ${messageForErrorStatus}` : ""
                }`,
              });
            }
          },
        };
  },
};
