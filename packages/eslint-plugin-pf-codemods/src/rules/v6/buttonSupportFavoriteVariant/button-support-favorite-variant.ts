import { Rule } from "eslint";
import { JSXElement, JSXIdentifier, JSXFragment } from "estree-jsx";
import {
  getFromPackage,
  getAttribute,
  getAttributeValue,
  isReactIcon,
} from "../../helpers";

// https://www.patternfly.org/components/button/#favorite
module.exports = {
  meta: {},
  create: function (context: Rule.RuleContext) {
    const { imports: buttonImports } = getFromPackage(context, "@patternfly/react-core");
    const { imports: iconImports } = getFromPackage(context, "@patternfly/react-icons");

    const buttonImport = buttonImports.find(
      (specifier) => specifier.imported.name === "Button"
    );

    if (!buttonImport) {
      return {};
    }

    // Helper function to check if a JSX element is a StarIcon
    const isStarIcon = (element: JSXElement) => {
      return isReactIcon(context, element) && 
        iconImports.some(
          (specifier) => specifier.imported.name === "StarIcon" && 
                        specifier.local.name === (element.openingElement.name as JSXIdentifier).name
        );
    };

    // Helper function to recursively check for StarIcon in children
    const hasStarIconInChildren = (children: any[]): boolean => {
      return children.some((child) => {
        if (child.type === "JSXElement") {
          return isStarIcon(child);
        }
        if (child.type === "JSXFragment") {
          return hasStarIconInChildren(child.children);
        }
        return false;
      });
    };

    return {
      JSXElement(node: JSXElement) {
        if (
          node.openingElement.name.type === "JSXIdentifier" &&
          buttonImport.local.name === node.openingElement.name.name
        ) {
          // Check if Button already has isFavorite or isFavorited props
          const isFavoriteProp = getAttribute(node.openingElement, "isFavorite");
          const isFavoritedProp = getAttribute(node.openingElement, "isFavorited");
          
          if (isFavoriteProp || isFavoritedProp) {
            return; // Already using the new props
          }

          // Check for StarIcon in the icon prop
          const iconProp = getAttribute(node.openingElement, "icon");
          if (iconProp && iconProp.value?.type === "JSXExpressionContainer") {
            const iconExpression = iconProp.value.expression;
            if (iconExpression.type === "JSXElement" && isStarIcon(iconExpression)) {
              context.report({
                node,
                message: `It looks like you are trying to create a custom favorites button. Use \`isFavorite\` and \`isFavorited\` button properties instead to apply the correct styling.`,
              });
              return;
            }
          }

          // Check for StarIcon in children (including fragments)
          const hasStarIconChild = hasStarIconInChildren(node.children);

          if (!hasStarIconChild) {
            return; // No StarIcon found
          }

          // Report warning for all cases
          context.report({
            node,
            message: `It looks like you are trying to create a custom favorites button. Use \`isFavorite\` and \`isFavorited\` button properties instead to apply the correct styling.`,
          });
        }
      },
    };
  },
};
