import { Rule } from "eslint";
import { JSXOpeningElement } from "estree-jsx";
import { getFromPackage } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10378
module.exports = {
  meta: {},
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const componentImport = imports.find(
      (specifier) => specifier.imported.name === "NotificationDrawerHeader"
    );

    return !componentImport
      ? {}
      : {
          JSXOpeningElement(node: JSXOpeningElement) {
            if (
              node.name.type === "JSXIdentifier" &&
              componentImport.local.name === node.name.name
            ) {
              context.report({
                node,
                message:
                  "NotificationDrawerHeader no longer uses our Text component internally, and instead renders a native `h1` element.",
              });
            }
          },
        };
  },
};
