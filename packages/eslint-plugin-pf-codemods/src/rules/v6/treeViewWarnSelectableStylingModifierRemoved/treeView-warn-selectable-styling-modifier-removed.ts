import { Rule } from "eslint";
import { JSXOpeningElement } from "estree-jsx";
import { getFromPackage } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10101
module.exports = {
  meta: {},
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const treeViewImport = imports.find(
      (specifier) => specifier.imported.name === "TreeView"
    );

    return !treeViewImport
      ? {}
      : {
          JSXOpeningElement(node: JSXOpeningElement) {
            if (
              node.name.type === "JSXIdentifier" &&
              treeViewImport.local.name === node.name.name
            ) {
              context.report({
                node,
                message:
                  "Selectable styling attribute (`pf-m-selectable`) has been removed on the list items of the TreeView component. You should update selectors, tests and snapshot tests which are relying on the `pf-m-selectable` class.",
              });
            }
          },
        };
  },
};
