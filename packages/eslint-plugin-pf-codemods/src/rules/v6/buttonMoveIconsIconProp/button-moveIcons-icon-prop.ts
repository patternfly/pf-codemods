import { Rule } from "eslint";
import { JSXElement } from "estree-jsx";
import {
  getFromPackage,
  getAttribute,
  getAttributeValue,
  getExpression,
  getChildrenAsAttributeValueText,
  getChildElementByName,
  isReactIcon,
} from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10663
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const source = context.getSourceCode();
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const buttonImport = imports.find(
      (specifier) => specifier.imported.name === "Button"
    );
    const buttonVariantEnumImport = imports.find(
      (specifier) => specifier.imported.name === "ButtonVariant"
    );
    const hasIconImport = imports.some(
      (specifier) => specifier.imported.name === "Icon"
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
              if (iconProp) {
                return;
              }
              const variantValue = getAttributeValue(
                context,
                variantProp?.value
              );

              const isEnumValuePlain =
                buttonVariantEnumImport &&
                variantValue?.object?.name ===
                  buttonVariantEnumImport.local.name &&
                variantValue?.property.name === "plain";

              const isPlain = variantValue === "plain" || isEnumValuePlain;

              const childrenProp = getAttribute(node, "children");

              let childrenValue: string | undefined;
              if (childrenProp) {
                const childrenPropExpression = getExpression(
                  childrenProp?.value
                );
                childrenValue = childrenPropExpression
                  ? `{${source.getText(childrenPropExpression)}}`
                  : "";
              } else if (isPlain) {
                childrenValue = getChildrenAsAttributeValueText(
                  context,
                  node.children
                );
              }

              if (!childrenValue && isPlain) {
                return;
              }

              const iconComponentChild =
                hasIconImport && getChildElementByName(node, "Icon");

              const jsxElementChildren = node.children.filter(
                (child) => child.type === "JSXElement"
              ) as JSXElement[];
              const reactIconChild = jsxElementChildren.find((child) =>
                isReactIcon(context, child)
              );

              const iconChild = iconComponentChild || reactIconChild;

              if (!isPlain && !iconChild) {
                return;
              }

              const iconChildString = `{${source.getText(iconChild)}}`;

              context.report({
                node,
                message: `Icons must now be passed to the \`icon\` prop of Button instead of as children. If you are passing anything other than an icon as children, ignore this rule when running fixes.`,
                fix(fixer) {
                  const fixes = [];
                  fixes.push(
                    fixer.insertTextAfter(
                      node.openingElement.name,
                      ` icon=${childrenValue || iconChildString}`
                    )
                  );

                  if (childrenProp) {
                    fixes.push(fixer.remove(childrenProp));
                  } else if (isPlain) {
                    node.children.forEach(
                      (child) =>
                        child.type !== "JSXSpreadChild" &&
                        fixes.push(fixer.replaceText(child, ""))
                    );
                  } else if (iconChild) {
                    fixes.push(fixer.replaceText(iconChild, ""));
                  }
                  return fixes;
                },
              });
            }
          },
        };
  },
};
