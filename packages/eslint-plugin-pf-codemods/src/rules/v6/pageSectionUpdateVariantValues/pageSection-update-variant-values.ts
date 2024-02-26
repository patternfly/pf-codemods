import { getFromPackage } from "../../helpers";
import { Rule } from "eslint";
import { JSXOpeningElement, JSXAttribute, Literal } from "estree-jsx";
import { isJsxAttribute } from "typescript";

// https://github.com/patternfly/patternfly-react/pull/9774
// https://github.com/patternfly/patternfly-react/pull/9848
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const pageSectionImport = imports.find(
      (specifier) => specifier.imported.name === "PageSection"
    );

    return !pageSectionImport
      ? {}
      : {
          JSXOpeningElement(node: JSXOpeningElement) {
            if (
              node.name.type === "JSXIdentifier" &&
              pageSectionImport.local.name === node.name.name
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
                !["default", "secondary"].includes(attribute.value.value)
              ) {
                context.report({
                  node,
                  message:
                    'The `variant` prop for PageSection now only accepts a value of "default" or "secondary". Running the fix for this rule will remove the prop so it uses the default value of "default".',
                  fix(fixer: {
                    replaceText: (arg0: any, arg1: string) => any;
                  }) {
                    return fixer.replaceText(attribute, "");
                  },
                });
              }
            }
          },
        };
  },
};
