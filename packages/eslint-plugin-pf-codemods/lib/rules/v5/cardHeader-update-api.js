const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8759
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const cardImports = getPackageImports(
      context,
      "@patternfly/react-core"
    ).filter((specifier) =>
      ["CardHeaderMain", "CardActions", "CardHeader"].includes(
        specifier.imported.name
      )
    );

    return !cardImports.length
      ? {}
      : {
          ImportDeclaration(node) {
            if (
              node.source.value !== "@patternfly/react-core" ||
              !node.specifiers.filter((specifier) =>
                cardImports
                  .map((imp) => imp.imported.name)
                  .includes(specifier?.imported?.name)
              ).length
            ) {
              return;
            }

            node.specifiers
              .filter((specifier) =>
                ["CardHeaderMain", "CardActions"].includes(
                  specifier.imported.name
                )
              )
              .forEach((specifier) => {
                const hasCommaAfter =
                  context.getSourceCode().getTokenAfter(specifier).value ===
                  ",";

                context.report({
                  node,
                  message: `${specifier.imported.name} is no longer exported.`,
                  fix(fixer) {
                    return hasCommaAfter
                      ? fixer.removeRange([
                          specifier.range[0],
                          specifier.range[1] + 1,
                        ])
                      : fixer.remove(specifier);
                  },
                });
              });
          },
          JSXElement(node) {
            if (node.openingElement.name.name !== "CardHeader") {
              return;
            }

            const findChildComponent = (childName) =>
              node.children.find(
                (child) =>
                  child.type === "JSXElement" &&
                  child.openingElement.name.name === childName
              );

            const getChildComponentContent = (childComponent) => {
              const childRegex = new RegExp(
                `<\/?${childComponent.openingElement.name.name}(.*?)>`,
                "g"
              );

              return context
                .getSourceCode()
                .getText(childComponent)
                .replace(childRegex, "");
            };

            const cardHeaderMain = findChildComponent("CardHeaderMain");
            const cardActions = findChildComponent("CardActions");

            if (cardHeaderMain) {
              context.report({
                node,
                message:
                  "CardHeaderMain is now rendered internally within CardHeader. Any CardHeaderMain content should instead be passed as children to CardHeader.",
                fix(fixer) {
                  const cardHeaderMainContent =
                    getChildComponentContent(cardHeaderMain);
                  return fixer.replaceText(
                    cardHeaderMain,
                    cardHeaderMainContent
                  );
                },
              });
            }

            if (cardActions) {
              context.report({
                node,
                message: `CardActions is now rendered internally within CardHeader. Any CardActions props should instead be passed as a CardHeaderActionsObject to CardHeader's "actions" prop.`,
                fix(fixer) {
                  const cardActionProps = cardActions.openingElement.attributes;
                  const existingClassProp = cardActionProps.find(
                    (prop) => prop.name.name === "className"
                  );
                  const cardActionsContent = getChildComponentContent(
                    cardActions
                  ).replace(/\s*/g, "");
                  const newActionsPropValue = `{ actions: <>${cardActionsContent}</>, hasNoOffset: ${cardActionProps.some(
                    (prop) => prop.name.name === "hasNoOffset"
                  )}, className: ${
                    existingClassProp
                      ? `"${existingClassProp.value.value}"`
                      : undefined
                  }
                  }`;

                  return [
                    fixer.insertTextAfter(
                      node.openingElement.attributes.pop(),
                      ` actions={${newActionsPropValue}}`
                    ),
                    fixer.remove(cardActions),
                  ];
                },
              });
            }
          },
        };
  },
};
