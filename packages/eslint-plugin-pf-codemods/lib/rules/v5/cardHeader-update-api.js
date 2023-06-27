const { getFromPackage } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8759
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");
    const removedCardImports = imports.filter((specifier) =>
      ["CardHeaderMain", "CardActions"].includes(specifier.imported.name)
    );
    const cardHeaderImport = imports.find(
      (specifier) => specifier.imported.name === "CardHeader"
    );

    const getClosestParentAndExpression = (node, elementNameToFind) => {
      const current = {
        parent: node?.parent,
        expression: undefined,
      };

      while (current.parent) {
        if (current.parent.openingElement?.name?.name === elementNameToFind) {
          return current;
        }
        if (
          ["ConditionalExpression", "LogicalExpression"].includes(
            current.parent.type
          )
        ) {
          current.expression = current.parent;
        }

        current.parent = current.parent.parent;
      }

      return undefined;
    };
    const getNodeContent = (node) => {
      return node.children
        ?.map((child) => context.getSourceCode().getText(child))
        .join("");
    };
    const createReplacementContent = (content, conditionOrLogicExpression) => {
      const isCardHeaderMainContent = /^<>.*<\/>$/.test(content);

      if (!conditionOrLogicExpression) {
        return isCardHeaderMainContent ? content : `actions={${content}}`;
      }

      const sourceCode = context.getSourceCode();

      if (conditionOrLogicExpression.type === "LogicalExpression") {
        const logicalExpressionContent = sourceCode.getText(
          conditionOrLogicExpression.left
        );
        const { operator } = conditionOrLogicExpression;

        return isCardHeaderMainContent
          ? `{${logicalExpressionContent} ${operator} ${content}}`
          : `{...(${logicalExpressionContent} ${operator} {actions: ${content}})}`;
      }

      if (conditionOrLogicExpression.type === "ConditionalExpression") {
        const conditionalTestContent = sourceCode.getText(
          conditionOrLogicExpression.test
        );
        const conditionalAlternateContent = sourceCode.getText(
          conditionOrLogicExpression.alternate
        );

        return isCardHeaderMainContent
          ? `{${conditionalTestContent} ? ${content} : ${conditionalAlternateContent}}`
          : `actions={${conditionalTestContent} ? ${content} : {}}`;
      }
    };

    return ![...removedCardImports, cardHeaderImport].length
      ? {}
      : {
          JSXElement(node) {
            const nodeName = node?.openingElement?.name?.name;
            const relatedImportName = removedCardImports.find(
              (removedImport) => removedImport.local.name === nodeName
            );
            const nodeIsRemovedImport = removedCardImports.find(
              (removedImport) =>
                [
                  removedImport?.imported?.name,
                  removedImport?.local?.name,
                ].includes(nodeName)
            );
            const closestParentAndExpression = getClosestParentAndExpression(
              node,
              "CardHeader"
            );
            if (!nodeIsRemovedImport || !closestParentAndExpression.parent) {
              return;
            }

            context.report({
              node,
              message: `${nodeName} is no longer exported and is instead rendered internally within CardHeader. ${nodeName} ${
                relatedImportName?.imported.name === "CardActions"
                  ? `props and content should instead be passed as an object to CardHeader's "actions" prop.`
                  : "content should instead be passed directly as children to CardHeader."
              }`,
              fix(fixer) {
                const fixes = [];
                const nodeContent = getNodeContent(node);
                const { parent, expression } = closestParentAndExpression;
                const nodeToReplace = expression ? expression.parent : node;

                if (relatedImportName?.imported.name === "CardHeaderMain") {
                  const replacementContent = createReplacementContent(
                    `<>${nodeContent}</>`,
                    expression
                  );
                  fixes.push(
                    fixer.replaceText(nodeToReplace, replacementContent)
                  );
                }

                if (relatedImportName?.imported.name === "CardActions") {
                  const cardActionProps = node.openingElement.attributes;
                  const existingClassProp = cardActionProps.find(
                    (prop) => prop.name.name === "className"
                  );
                  const newActionsPropValue = `{ actions: <>${nodeContent.trim()}</>, hasNoOffset: ${cardActionProps.some(
                    (prop) => prop.name.name === "hasNoOffset"
                  )}, className: ${
                    existingClassProp
                      ? `"${existingClassProp.value.value}"`
                      : undefined
                  }}`;
                  const replacementContent = createReplacementContent(
                    newActionsPropValue,
                    expression
                  );

                  fixes.push(
                    fixer.insertTextAfter(
                      parent.openingElement.name,
                      ` ${replacementContent} `
                    ),
                    fixer.remove(nodeToReplace)
                  );
                }

                return fixes;
              },
            });
          },
        };
  },
};
