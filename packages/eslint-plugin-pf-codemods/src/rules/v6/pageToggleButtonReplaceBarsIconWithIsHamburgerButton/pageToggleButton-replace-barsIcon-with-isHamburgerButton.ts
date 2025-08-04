import { Rule } from "eslint";
import { JSXElement } from "estree-jsx";
import {
  getFromPackage,
  getChildJSXElementByName,
  isReactIcon,
  getAttribute,
  removeElement,
  makeJSXElementSelfClosing,
} from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/11861
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const source = context.getSourceCode();
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const pageToggleButtonImport = imports.find(
      (specifier) => specifier.imported.name === "PageToggleButton"
    );

    return !pageToggleButtonImport
      ? {}
      : {
          JSXElement(node: JSXElement) {
            if (
              node.openingElement.name.type === "JSXIdentifier" &&
              pageToggleButtonImport.local.name === node.openingElement.name.name
            ) {
              // Check if isHamburgerButton prop already exists
              const isHamburgerButtonProp = getAttribute(node, "isHamburgerButton");

              if (isHamburgerButtonProp) {
                return; // Already has the prop, skip
              }

              // Check if BarsIcon is a direct child
              const barsIconChild = getChildJSXElementByName(node, "BarsIcon");

              if (!barsIconChild) {
                return; // No BarsIcon child found
              }

              // Check if BarsIcon is imported from PatternFly
              if (!isReactIcon(context, barsIconChild)) {
                return; // BarsIcon is not from PatternFly, skip
              }

              context.report({
                node,
                message: `The BarsIcon child component should be replaced with the \`isHamburgerButton\` prop on PageToggleButton.`,
                fix(fixer) {
                  // Check if we need to make the element self-closing
                  const otherChildren = node.children.filter(child => child !== barsIconChild);
                  const shouldBeSelfClosing = otherChildren.length === 0 && node.closingElement;

                  // Always add the isHamburgerButton prop
                  const addPropFix = fixer.insertTextAfter(
                    node.openingElement.name,
                    " isHamburgerButton"
                  );

                  if (shouldBeSelfClosing) {
                    // For self-closing case: add prop and make self-closing (which removes children)
                    return [
                      addPropFix,
                      ...makeJSXElementSelfClosing(node, context, fixer, true)
                    ];
                  } else {
                    // For non-self-closing case: add prop and remove the specific child
                    return [
                      addPropFix,
                      ...removeElement(fixer, barsIconChild)
                    ];
                  }
                },
              });
            }
          },
        };
  },
}; 