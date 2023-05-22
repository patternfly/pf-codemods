const { getFromPackage } = require("../../helpers");

module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const paginationImport = getFromPackage(
      context,
      "@patternfly/react-core"
    ).imports.find((specifier) => specifier.imported.name === "Pagination");

    return !paginationImport
      ? {}
      : {
          JSXOpeningElement(node) {
            if (node.name.name === paginationImport.local.name) {
              const updatedPropNames = {
                perPageComponent: "",
                defaultToFullPage: "isLastFullPageShown",
              };

              const existingProps = node.attributes.filter((attribute) =>
                Object.keys(updatedPropNames).includes(attribute.name?.name)
              );

              if (existingProps.length) {
                existingProps.forEach((existingProp) => {
                  const newPropName = updatedPropNames[existingProp.name.name];
                  context.report({
                    node,
                    message: `The "${
                      existingProp.name.name
                    }" prop for Pagination has been ${
                      newPropName ? `renamed to "${newPropName}"` : "removed"
                    }.`,
                    fix(fixer) {
                      return [
                        fixer.replaceText(
                          existingProp,
                          updatedPropNames[existingProp.name.name]
                        ),
                      ];
                    },
                  });
                });
              }

              const titlesProp = node.attributes.find(
                (attribute) => attribute.name?.name === "titles"
              );

              if (titlesProp?.value?.expression?.type === "ObjectExpression") {
                const updatedTitlesPropNames = {
                  currPage: "currPageAriaLabel",
                  paginationTitle: "paginationAriaLabel",
                  toFirstPage: "toFirstPageAriaLabel",
                  toLastPage: "toLastPageAriaLabel",
                  toNextPage: "toNextPageAriaLabel",
                  toPreviousPage: "toPreviousPageAriaLabel",
                  optionsToggle: "optionsToggleAriaLabel",
                };

                const existingTitlesProps =
                  titlesProp.value.expression.properties.filter((property) =>
                    Object.keys(updatedTitlesPropNames).includes(
                      property.key.name
                    )
                  );

                if (existingTitlesProps.length) {
                  existingTitlesProps.forEach((existingTitlesProp) => {
                    const newTitlesPropName =
                      updatedTitlesPropNames[existingTitlesProp.key.name];
                    context.report({
                      node,
                      message: `The "${existingTitlesProp.key.name}" sub-prop for Pagination's "titles" prop has been renamed to "${newTitlesPropName}".`,
                      fix(fixer) {
                        return [
                          fixer.replaceTextRange(
                            existingTitlesProp.key.range,
                            newTitlesPropName
                          ),
                        ];
                      },
                    });
                  });
                }
              }
            }
          },
        };
  },
};
