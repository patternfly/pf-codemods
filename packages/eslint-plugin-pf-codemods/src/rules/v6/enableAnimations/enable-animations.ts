import { Rule } from "eslint";
import { JSXOpeningElement, JSXAttribute } from "estree-jsx";
import { getFromPackage, checkMatchingJSXOpeningElement } from "../../helpers";
import { getAttribute, getAttributeValue } from "../../helpers/JSXAttributes";

// Rule to add hasAnimations prop to components that support animations
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    // Get options from context (set by CLI)
    const includeTable =
      (context.settings && context.settings.enableAnimationsIncludeTable) ||
      (context.options && context.options[0] && context.options[0].includeTable) ||
      false;

    // Get imports from both react-core and react-table packages
    const { imports: coreImports } = getFromPackage(
      context,
      "@patternfly/react-core"
    );
    const { imports: tableImports } = getFromPackage(
      context,
      "@patternfly/react-table"
    );

    // Components that support hasAnimations prop
    const targetComponents = [
      "FormFieldGroupExpandable",
      "DualListSelector", 
      "TreeView",
      "AlertGroup",
      "SearchInputExpandable"
    ];

    // Table comes from react-table package
    const tableComponents = ["Table"];

    // Filter imports to only include target components
    const targetCoreImports = coreImports.filter((specifier) =>
      targetComponents.includes(specifier.imported.name)
    );

    // Only include Table if option is set
    const targetTableImports = includeTable
      ? tableImports.filter((specifier) =>
          tableComponents.includes(specifier.imported.name)
        )
      : [];

    const allTargetImports = [...targetCoreImports, ...targetTableImports];

    const message =
      "Consider adding hasAnimations prop to enable component animations.";

    // Helper function to check if isTree prop exists and isn't explicitly false
    function hasValidIsTreeProp(node: JSXOpeningElement): boolean {
      const isTreeAttribute = getAttribute(node, "isTree");

      if (!isTreeAttribute) {
        return false; // No isTree prop found
      }

      // If isTree has no value, it defaults to true
      if (!isTreeAttribute.value) {
        return true;
      }

      // Get the actual value using the helper
      const attributeValue = getAttributeValue(context, isTreeAttribute.value);
      
      // Check for explicit false: isTree={false}
      if (attributeValue.type === "Literal" && attributeValue.value === false) {
        return false;
      }

      // For anything else (including complex expressions), assume it could be truthy
      return true;
    }

    // Helper function to get component name from node
    function getComponentName(node: JSXOpeningElement): string | null {
      if (node.name.type === "JSXIdentifier") {
        return node.name.name;
      }
      return null;
    }

    return allTargetImports.length === 0
      ? {}
      : {
          JSXOpeningElement(node: JSXOpeningElement) {
            if (checkMatchingJSXOpeningElement(node, allTargetImports)) {
              const componentName = getComponentName(node);
              
              // Special handling for DualListSelector - only add hasAnimations if isTree is true
              if (componentName === "DualListSelector" && !hasValidIsTreeProp(node)) {
                return; // Skip this DualListSelector as it doesn't have isTree=true
              }

              // Check if hasAnimations prop already exists
              const hasAnimationsAttribute = node.attributes.find(
                (attr) =>
                  attr.type === "JSXAttribute" &&
                  attr.name.type === "JSXIdentifier" &&
                  attr.name.name === "hasAnimations"
              );

              // Only add prop if it doesn't already exist
              if (!hasAnimationsAttribute) {
                context.report({
                  node,
                  message,
                  fix(fixer) {
                    // Insert hasAnimations at the end of existing attributes
                    if (node.attributes.length > 0) {
                      const lastAttribute = node.attributes[node.attributes.length - 1];
                      return fixer.insertTextAfter(lastAttribute, " hasAnimations");
                    } else {
                      // No existing attributes, insert after component name
                      return fixer.insertTextAfter(node.name, " hasAnimations");
                    }
                  },
                });
              }
            }
          },
        };
  },
}; 