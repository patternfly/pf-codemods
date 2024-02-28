import { getFromPackage } from "../../helpers";
import { Rule } from "eslint";
import { JSXOpeningElement } from "estree-jsx";

// https://github.com/patternfly/patternfly-react/pull/10029
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const helperTextItemImport = imports.find(
      (specifier: { imported: { name: string } }) =>
        specifier.imported.name === "HelperTextItem"
    );

    return !helperTextItemImport
      ? {}
      : {
          JSXOpeningElement(node: JSXOpeningElement) {
            if (
              node.name.type === "JSXIdentifier" &&
              helperTextItemImport.local.name === node.name.name
            ) {
              context.report({
                node,
                message:
                  'The `screenReaderText` prop on HelperTextItem has been updated, and will now render only when the `variant` prop has a value other than "default". Previously the prop was rendered only when the `isDynamic` prop was true.',
              });
            }
          },
        };
  },
};
