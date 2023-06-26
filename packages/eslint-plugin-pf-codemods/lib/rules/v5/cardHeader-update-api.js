const { getFromPackage, pfPackageMatches } = require("../../helpers");

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

    const findParents = (node, elementNameToFind) => {
      const parents = {
        current: node?.parent,
        conditionalExpression: undefined,
      };

      while (parents.current) {
        if (parents.current.openingElement?.name?.name === elementNameToFind) {
          return parents;
        }
        if (
          ["ConditionalExpression", "LogicalExpression"].includes(
            parents.current.type
          )
        ) {
          parents.conditionalExpression = parents.current;
        }

        parents.current = parents.current.parent;
      }

      return undefined;
    };
    const getComponentContent = (component) => {
      const tagsRegex = new RegExp(
        `<\/?${component.openingElement.name.name}(.*?)>`,
        "g"
      );

      return context.getSourceCode().getText(component).replace(tagsRegex, "");
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
            const nodeParents = findParents(node, "CardHeader");
            if (!nodeIsRemovedImport || !nodeParents.current) {
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
                const nodeContent = getComponentContent(node);
                const { current, conditionalExpression } = nodeParents;
                const nodeToReplace = conditionalExpression
                  ? conditionalExpression.parent
                  : node;

                if (relatedImportName?.imported.name === "CardHeaderMain") {
                  const replacementContent = createReplacementContent(
                    `<>${nodeContent}</>`,
                    conditionalExpression
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
                    conditionalExpression
                  );

                  fixes.push(
                    fixer.insertTextAfter(
                      current.openingElement.name,
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
