import { Rule } from "eslint";
import { JSXElement, JSXFragment } from "estree-jsx";
import {
  childrenIsEmpty,
  getFromPackage,
  getAttribute,
  getAttributeValue,
  getExpression,
  getChildrenAsAttributeValueText,
  getChildJSXElementByName,
  isReactIcon,
  makeJSXElementSelfClosing,
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
    const iconImport = imports.find(
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

              let plainButtonChildrenString: string | undefined;
              let nodeWithChildren: JSXElement | JSXFragment = node;
              const childrenProp = getAttribute(node, "children");

              if (childrenProp && childrenIsEmpty(node.children)) {
                const childrenPropExpression = getExpression(
                  childrenProp?.value
                );
                if (
                  childrenPropExpression?.type === "JSXElement" ||
                  childrenPropExpression?.type === "JSXFragment"
                ) {
                  nodeWithChildren = childrenPropExpression;
                }

                if (isPlain) {
                  plainButtonChildrenString = childrenPropExpression
                    ? `{${source.getText(childrenPropExpression)}}`
                    : "";
                }
              } else if (isPlain) {
                plainButtonChildrenString = getChildrenAsAttributeValueText(
                  context,
                  node.children
                );
              }

              if (!plainButtonChildrenString && isPlain) {
                return;
              }

              const iconComponentChild =
                iconImport &&
                getChildJSXElementByName(
                  nodeWithChildren,
                  iconImport.local.name
                );

              const jsxElementChildren = nodeWithChildren.children.filter(
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
                      ` icon=${plainButtonChildrenString || iconChildString}`
                    )
                  );

                  if (isPlain) {
                    if (childrenProp) {
                      fixes.push(fixer.remove(childrenProp));
                    }

                    fixes.push(
                      ...makeJSXElementSelfClosing(node, context, fixer, true)
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
