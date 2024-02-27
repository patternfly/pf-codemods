import { Rule } from "eslint";
import { getFromPackage } from "../../helpers";
import { JSXAttribute, JSXOpeningElement, Literal } from "estree-jsx";

// https://github.com/patternfly/patternfly-react/pull/9948
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const navImport = imports.find(
      (specifier: { imported: { name: string } }) =>
        specifier.imported.name === "Nav"
    );

    return !navImport
      ? {}
      : {
          JSXOpeningElement(node: JSXOpeningElement) {
            if (
              node.name.type === "JSXIdentifier" &&
              navImport.local.name === node.name.name
            ) {
              const variantAttribute = node.attributes.find(
                (attr) =>
                  attr.type === "JSXAttribute" && attr.name?.name === "variant"
              ) as JSXAttribute;

              if (!variantAttribute) {
                return;
              }

              let variantLiteral: Literal | null = null;

              if (variantAttribute.value?.type === "Literal") {
                variantLiteral = variantAttribute.value;
              }

              if (
                variantAttribute.value?.type === "JSXExpressionContainer" &&
                variantAttribute.value?.expression.type === "Literal"
              ) {
                variantLiteral = variantAttribute.value?.expression;
              }

              if (variantLiteral?.value === "tertiary") {
                context.report({
                  node,
                  message:
                    'The "tertiary" Nav variant is no longer supported. Use variant="horizontal-subnav" instead.',
                  fix: <Rule.ReportFixer>function (fixer) {
                    return fixer.replaceText(
                      variantLiteral!,
                      '"horizontal-subnav"'
                    );
                  },
                });
              }
            }
          },
        };
  },
};
