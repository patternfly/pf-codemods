import { Rule } from "eslint";
import { JSXElement, ObjectExpression, Property } from "estree-jsx";
import {
  getFromPackage,
  checkMatchingJSXOpeningElement,
  getAttribute,
  getAttributeValue,
  getSpecifierFromImports,
  getChildJSXElementByName,
  getObjectProperty,
  removePropertiesFromObjectExpression,
  getNodeForAttributeFixer,
} from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10859
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const basePackage = "@patternfly/react-core";
    const { imports: componentImports } = getFromPackage(context, basePackage);
    const cardImport = getSpecifierFromImports(componentImports, "Card");
    const cardHeaderImport = getSpecifierFromImports(
      componentImports,
      "CardHeader"
    );

    // Actionable cards won't work as intended if both components aren't imported, hence
    // we shouldn't need to relay any message if that is the case
    return !cardImport || !cardHeaderImport
      ? {}
      : {
          JSXElement(node: JSXElement) {
            if (
              checkMatchingJSXOpeningElement(node.openingElement, cardImport)
            ) {
              const isClickableProp = getAttribute(node, "isClickable");
              const isSelectableProp = getAttribute(node, "isSelectable");

              if ((isClickableProp && isSelectableProp) || !isClickableProp) {
                return;
              }

              const cardHeaderChild = getChildJSXElementByName(
                node,
                cardHeaderImport.local.name
              );
              const selectableActionsProp = cardHeaderChild
                ? getAttribute(cardHeaderChild, "selectableActions")
                : undefined;
              if (!cardHeaderChild || !selectableActionsProp) {
                return;
              }
              const selectableActionsValue = getAttributeValue(
                context,
                selectableActionsProp.value
              ) as ObjectExpression["properties"]; // selectableActions prop on CardHeader accepts an object
              if (!selectableActionsValue) {
                return;
              }

              const selectableActionsProperties = selectableActionsValue.filter(
                (val) => val.type === "Property"
              ) as Property[];

              const nameProperty = getObjectProperty(
                context,
                selectableActionsProperties,
                "name"
              );
              const idProperty = getObjectProperty(
                context,
                selectableActionsProperties,
                "selectableActionId"
              );

              const baseMessage =
                "The markup for clickable-only cards has been updated.";
              const message = `${baseMessage}${
                nameProperty || idProperty
                  ? " Additionally, the `selectableActions.selectableActionId` and `selectableActions.name` props are no longer necessary to pass to CardHeader for clickable-only cards."
                  : ""
              }`;
              context.report({
                node,
                message,
                fix(fixer) {
                  const validPropertiesToRemove = [
                    nameProperty,
                    idProperty,
                  ].filter((property) => !!property);
                  if (
                    !validPropertiesToRemove.length ||
                    !selectableActionsProp.value
                  ) {
                    return [];
                  }
                  const propertiesToKeep = removePropertiesFromObjectExpression(
                    selectableActionsProperties,
                    validPropertiesToRemove
                  );
                  const replacementProperties = propertiesToKeep
                    .map((property) =>
                      context.getSourceCode().getText(property)
                    )
                    .join(", ");

                  const nodeToUpdate = getNodeForAttributeFixer(
                    context,
                    selectableActionsProp
                  );

                  if (!nodeToUpdate) {
                    return [];
                  }

                  return fixer.replaceText(
                    nodeToUpdate,
                    propertiesToKeep.length
                      ? `{${replacementProperties}}`
                      : "{}"
                  );
                },
              });
            }
          },
        };
  },
};
