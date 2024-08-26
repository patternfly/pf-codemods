import { Rule } from "eslint";
import { JSXElement, Property, Literal } from "estree-jsx";
import {
  getAllImportsFromPackage,
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
              );
              if (!selectableActionsValue) {
                return;
              }

              const nameProperty = getObjectProperty(
                context,
                selectableActionsValue,
                "name"
              );
              const idProperty = getObjectProperty(
                context,
                selectableActionsValue,
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
                    selectableActionsValue,
                    validPropertiesToRemove
                  );
                  const replacementProperties = propertiesToKeep
                    .map((property: Property) =>
                      context.getSourceCode().getText(property)
                    )
                    .join(", ");

                  const nodeToUpdate = getNodeForAttributeFixer(
                    context,
                    selectableActionsProp
                  );
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
