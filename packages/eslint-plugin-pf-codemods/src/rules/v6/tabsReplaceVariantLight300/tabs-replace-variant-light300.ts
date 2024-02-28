import { getFromPackage } from "../../helpers";
import { Rule } from "eslint";
import { JSXOpeningElement, JSXAttribute } from "estree-jsx";

// https://github.com/patternfly/patternfly-react/pull/9930
// https://github.com/patternfly/patternfly-react/pull/10044
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const { imports, exports } = getFromPackage(
      context,
      "@patternfly/react-core"
    );

    const tabsImport = imports.find(
      (specifier: { imported: { name: string }; local: { name: string } }) =>
        specifier.imported.name === "Tabs"
    );

    return !tabsImport
      ? {}
      : {
          JSXOpeningElement(node: JSXOpeningElement) {
            if (
              node.name.type === "JSXIdentifier" &&
              tabsImport.local.name === node.name.name
            ) {
              const attribute = node.attributes.find(
                (attr) =>
                  attr.type === "JSXAttribute" && attr.name.name === "variant"
              ) as JSXAttribute | undefined;

              if (!attribute || !attribute.value) {
                return;
              }

              if (
                attribute.value.type === "Literal" &&
                typeof attribute.value.value === "string" &&
                attribute.value.value === "light300"
              ) {
                context.report({
                  node,
                  message:
                    'The "light300" value for the `variant` prop on Tabs has been replaced with the "secondary" value.',
                  fix(fixer) {
                    return fixer.replaceText(attribute, 'variant="secondary"');
                  },
                });
              }
            }
          },
        };
  },
};
