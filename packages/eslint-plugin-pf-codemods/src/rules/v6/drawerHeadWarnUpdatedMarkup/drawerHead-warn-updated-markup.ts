import { getFromPackage } from "../../helpers";
import { Rule } from "eslint";
import { JSXOpeningElement } from "estree-jsx";

// https://github.com/patternfly/patternfly-react/pull/10036
module.exports = {
  meta: {},
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const drawerHeadImport = imports.find(
      (specifier: { imported: { name: string } }) =>
        specifier.imported.name === "DrawerHead"
    );

    return !drawerHeadImport
      ? {}
      : {
          JSXOpeningElement(node: JSXOpeningElement) {
            if (
              node.name.type === "JSXIdentifier" &&
              drawerHeadImport.local.name === node.name.name
            ) {
              context.report({
                node,
                message:
                  "DrawerPanelBody is no longer rendered internally to DrawerHead. We recommend using these components independent of one another and to not pass DrawerPanelBody to DrawerHead.",
              });
            }
          },
        };
  },
};
