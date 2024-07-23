import { Rule } from "eslint";
import { JSXOpeningElement, MemberExpression } from "estree-jsx";
import {
  getAttribute,
  getFromPackage,
  getImportSpecifiersLocalNames,
} from "../../helpers";

// https://github.com/patternfly/react-component-groups/pull/145
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const componentGroupsPackage = "@patternfly/react-component-groups";

    const { imports } = getFromPackage(context, componentGroupsPackage);

    const logSnippetBorderVariantImports = imports.filter(
      (specifier) => specifier.imported.name === "LogSnippetBorderVariant"
    );

    const logSnippetLocalNames = getImportSpecifiersLocalNames(
      context,
      "LogSnippet",
      componentGroupsPackage
    );

    return !logSnippetLocalNames.length &&
      !logSnippetBorderVariantImports.length
      ? {}
      : {
          JSXOpeningElement(node: JSXOpeningElement) {
            if (
              node.name.type === "JSXIdentifier" &&
              logSnippetLocalNames.includes(node.name.name)
            ) {
              const leftBorderVariantAttribute = getAttribute(
                node,
                "leftBorderVariant"
              );

              if (leftBorderVariantAttribute) {
                context.report({
                  node,
                  message:
                    "We've renamed leftBorderVariant prop to variant on LogSnippet component group.",
                  fix(fixer) {
                    return fixer.replaceText(
                      leftBorderVariantAttribute.name,
                      "variant"
                    );
                  },
                });
              }
            }
          },
          MemberExpression(node: MemberExpression) {
            if (
              node.object.type === "Identifier" &&
              logSnippetBorderVariantImports
                .map((imp) => imp.local.name)
                .includes(node.object.name)
            ) {
              let replaceToken;
              if (node.property.type === "Identifier") {
                replaceToken = node.property.name;
              }
              if (node.property.type === "Literal") {
                replaceToken = node.property.value as string;
              }

              if (replaceToken) {
                context.report({
                  node,
                  message:
                    "We've replaced LogSnippetBorderVariant enum with PatternFly's AlertVariant enum.",
                  fix(fixer) {
                    return fixer.replaceText(node, `"${replaceToken}"`);
                  },
                });
              }
            }
          },
        };
  },
};
