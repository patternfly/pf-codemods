import { Rule } from "eslint";
import { JSXOpeningElement } from "estree-jsx";
import { getFromPackage, getAttribute } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10674
module.exports = {
  meta: {},
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const toolbarLabelGroupContentImport = imports.find(
      (specifier) => specifier.imported.name === "ToolbarLabelGroupContent"
    );

    return !toolbarLabelGroupContentImport
      ? {}
      : {
          JSXOpeningElement(node: JSXOpeningElement) {
            if (
              node.name.type === "JSXIdentifier" &&
              toolbarLabelGroupContentImport.local.name === node.name.name
            ) {
              const numberOfFiltersProp = getAttribute(node, "numberOfFilters");
              const showClearFiltersButtonProp = getAttribute(
                node,
                "showClearFiltersButton"
              );
              const customLabelGroupContentProp = getAttribute(
                node,
                "customLabelGroupContent"
              );
              if (
                numberOfFiltersProp ||
                showClearFiltersButtonProp ||
                customLabelGroupContentProp
              ) {
                context.report({
                  node,
                  message:
                    "The markup for ToolbarLabelGruopContent has changed when numberOfFilters is greater than 0, showClearFilterButton is true, or customLabelGroupContent is passed.",
                });
              }
            }
          },
        };
  },
};
