const { getFromPackage, findVariableDeclaration } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/9382
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const { imports } = getFromPackage(context, "@patternfly/react-table");

    const actionsColumnImport = imports.find(
      (specifier) => specifier.imported.name === "ActionsColumn"
    );

    return !actionsColumnImport
      ? {}
      : {
          JSXOpeningElement(node) {
            if (actionsColumnImport.local?.name !== node.name?.name) {
              return;
            }

            const itemsProp = node.attributes.find(
              (attr) => attr.name?.name === "items"
            );
            const getItemsFromVariable = (variableDeclaration) => {
              const variableNodeProperty = variableDeclaration?.defs?.[0]?.node;

              if (
                variableNodeProperty?.init?.type === "ArrowFunctionExpression"
              ) {
                return variableNodeProperty.init.body?.elements;
              }

              if (variableNodeProperty?.init?.type === "ArrayExpression") {
                return variableNodeProperty.init.elements;
              }
            };

            let itemsPropValue;
            if (itemsProp.value.expression?.type === "Identifier") {
              const currentScope = context.getSourceCode().getScope(node);
              const itemsPropDeclaration = findVariableDeclaration(
                itemsProp.value.expression.name,
                currentScope
              );
              itemsPropValue = getItemsFromVariable(itemsPropDeclaration);
            } else {
              itemsPropValue = itemsProp.value.expression?.elements;
            }

            const getItemsWithTooltipProp = (itemsArray) =>
              itemsArray?.filter((element) =>
                element?.properties?.find(
                  (property) => property?.key?.name === "tooltip"
                )
              );

            const itemsWithTooltip = getItemsWithTooltipProp(itemsPropValue);

            if (itemsWithTooltip?.length) {
              const getTooltipPropValue = (tooltipProp) => {
                const { type, value, name } = tooltipProp.value;

                if (type === "Literal") {
                  return `"${value}"`;
                }

                if (type === "Identifier") {
                  return `${name}`;
                }

                if (type === "JSXElement") {
                  return context.getSourceCode().getText(tooltipProp.value);
                }
              };

              itemsWithTooltip.forEach((itemWithTooltip) => {
                context.report({
                  node,
                  message: `The "tooltip" property has been removed from ActionsColumn's "item" prop interface. Instead a "content" property should be passed into the "tooltipProps" property of the "items" interface.`,
                  fix(fixer) {
                    const fixes = [];
                    const tooltipProperty = itemWithTooltip.properties.find(
                      (property) => property.key.name === "tooltip"
                    );
                    const tooltipPropValue =
                      getTooltipPropValue(tooltipProperty);
                    const tooltipPropsProperty =
                      itemWithTooltip.properties.find(
                        (property) => property.key.name === "tooltipProps"
                      );
                    const tooltipPropsContent =
                      tooltipPropsProperty?.value?.properties?.find(
                        (prop) => prop?.key?.name === "content"
                      );

                    if (tooltipPropsProperty && !tooltipPropsContent) {
                      fixes.push(
                        fixer.insertTextBefore(
                          tooltipPropsProperty.value.properties[0],
                          `content: ${tooltipPropValue}, `
                        )
                      );

                      const tooltipPropertyHasComma =
                        context.getSourceCode().getTokenAfter(tooltipProperty)
                          .value === ",";
                      const { range } = tooltipProperty;
                      fixes.push(
                        fixer.removeRange([
                          range[0],
                          tooltipPropertyHasComma ? range[1] + 1 : range[1],
                        ])
                      );
                    } else if (!tooltipPropsProperty && tooltipProperty) {
                      fixes.push(
                        fixer.replaceText(
                          tooltipProperty,
                          `tooltipProps: { content: ${tooltipPropValue} }`
                        )
                      );
                    }

                    return fixes;
                  },
                });
              });
            }
          },
        };
  },
};
