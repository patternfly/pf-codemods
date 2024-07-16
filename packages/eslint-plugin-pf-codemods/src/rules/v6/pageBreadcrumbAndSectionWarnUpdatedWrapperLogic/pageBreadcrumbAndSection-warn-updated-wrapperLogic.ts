import { Rule } from "eslint";
import { JSXOpeningElement } from "estree-jsx";
import {
  getFromPackage,
  getAttribute,
  getAttributeValueText,
} from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10650
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const componentImports = imports.filter((specifier) =>
      ["PageBreadcrumb", "PageSection"].includes(specifier.imported.name)
    );

    return !componentImports.length
      ? {}
      : {
          JSXOpeningElement(node: JSXOpeningElement) {
            const applicableComponent = componentImports.find(
              (imp) =>
                node.name.type === "JSXIdentifier" &&
                imp.local.name === node.name.name
            );
            if (applicableComponent) {
              const isWidthLimitedProp = getAttribute(node, "isWidthLimited");
              const isWidthLimitedValueText = getAttributeValueText(
                context,
                isWidthLimitedProp
              );
              const hadBodyWrapperProp = getAttribute(node, "hasBodyWrapper");

              if (!hadBodyWrapperProp) {
                context.report({
                  node,
                  message: `The isWidthLimited prop on ${applicableComponent.imported.name} will no longer determine whether the children are wrapped in a PageBody. Instead the new hasBodyWrapper prop must be used. By default this new prop is set to true. Running the fix for this rule will apply hasBodyWrapper with the same value as the isWidthLimited prop or false if isWidthLimited is not passed.`,
                  fix(fixer) {
                    const hasBodyWrapperValue = isWidthLimitedProp
                      ? isWidthLimitedValueText
                      : `{false}`;
                    return fixer.insertTextAfter(
                      node.name,
                      ` hasBodyWrapper${
                        hasBodyWrapperValue ? `=${hasBodyWrapperValue}` : ""
                      }`
                    );
                  },
                });
              }
            }
          },
        };
  },
};
