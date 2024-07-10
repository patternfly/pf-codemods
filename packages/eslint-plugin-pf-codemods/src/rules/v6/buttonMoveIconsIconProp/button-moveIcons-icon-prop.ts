import { Rule } from "eslint";
import { JSXElement } from "estree-jsx";
import {
  getFromPackage,
  getAttribute,
  getAttributeValue,
  getExpression,
  getChildrenAsAttributeValueText,
} from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10663
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const buttonImport = imports.find(
      (specifier) => specifier.imported.name === "Button"
    );
    const buttonVariantEnumImport = imports.find(
      (specifier) => specifier.imported.name === "ButtonVariant"
    );

    return !buttonImport
      ? {}
      : {
          JSXElement(node: JSXElement) {
            if (
              node.openingElement.name.type === "JSXIdentifier" &&
              buttonImport.local.name === node.openingElement.name.name
            ) {
              const variantProp = getAttribute(node.openingElement, "variant");
              const iconProp = getAttribute(node.openingElement, "icon");
              if (!variantProp || iconProp) {
                return;
              }
              const variantValue = getAttributeValue(
                context,
                variantProp.value
              );

              const isEnumValuePlain =
                buttonVariantEnumImport &&
                variantValue.object?.name ===
                  buttonVariantEnumImport.local.name &&
                variantValue.property.name === "plain";
              if (variantValue !== "plain" && !isEnumValuePlain) {
                return;
              }
              const childrenProp = getAttribute(node, "children");
              let childrenValue;
              if (childrenProp) {
                const childrenPropExpression = getExpression(
                  childrenProp?.value
                );
                childrenValue = childrenPropExpression
                  ? context.getSourceCode().getText(childrenPropExpression)
                  : "";
              } else {
                childrenValue = getChildrenAsAttributeValueText(
                  context,
                  node.children
                );
              }
              if (!childrenValue) {
                return;
              }

              context.report({
                node,
                message: `Icons must now be passed to the \`icon\` prop of Button instead of as children. If you are passing anything other than an icon as children, ignore this rule when running fixes.`,
                fix(fixer) {
                  const fixes = [];
                  fixes.push(
                    fixer.insertTextAfter(
                      node.openingElement.name,
                      ` icon=${childrenValue}`
                    )
                  );

                  if (childrenProp) {
                    fixes.push(fixer.remove(childrenProp));
                  } else {
                    node.children.forEach(
                      (child) =>
                        child.type !== "JSXSpreadChild" &&
                        fixes.push(fixer.replaceText(child, ""))
                    );
                  }
                  return fixes;
                },
              });
            }
          },
        };
  },
};
