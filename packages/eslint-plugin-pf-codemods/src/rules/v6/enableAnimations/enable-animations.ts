import { Rule } from "eslint";
import { JSXOpeningElement } from "estree-jsx";
import { getFromPackage, checkMatchingJSXOpeningElement } from "../../helpers";

// Rule to add hasAnimations prop to components that support animations
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
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
      "SearchInput"
    ];

    // Table comes from react-table package
    const tableComponents = ["Table"];

    // Filter imports to only include target components
    const targetCoreImports = coreImports.filter((specifier) =>
      targetComponents.includes(specifier.imported.name)
    );

    const targetTableImports = tableImports.filter((specifier) =>
      tableComponents.includes(specifier.imported.name)
    );

    const allTargetImports = [...targetCoreImports, ...targetTableImports];

    const message =
      "Consider adding hasAnimations prop to enable component animations.";

    return allTargetImports.length === 0
      ? {}
      : {
          JSXOpeningElement(node: JSXOpeningElement) {
            if (checkMatchingJSXOpeningElement(node, allTargetImports)) {
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
                    return fixer.insertTextAfter(
                      node.name,
                      " hasAnimations"
                    );
                  },
                });
              }
            }
          },
        };
  },
}; 