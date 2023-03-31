const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8759
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const removedCardImports = getPackageImports(
      context,
      "@patternfly/react-core"
    ).filter((specifier) =>
      ["CardHeaderMain", "CardActions"].includes(specifier.imported.name)
    );
    const cardHeaderImport = getPackageImports(
      context,
      "@patternfly/react-core"
    ).find((specifier) => specifier.imported.name === "CardHeader");

    return ![...removedCardImports, cardHeaderImport].length
      ? {}
      : {
          ImportDeclaration(node) {
            if (
              node.source.value !== "@patternfly/react-core" ||
              !node.specifiers.filter((specifier) =>
                removedCardImports
                  .map((imp) => imp.imported.name)
                  .includes(specifier?.imported?.name)
              ).length
            ) {
              return;
            }

            const validImports = node.specifiers.filter(
              (specifier) =>
                !["CardHeaderMain", "CardActions"].includes(
                  specifier.imported.name
                )
            );

            const existingCardHeaderMain = node.specifiers.find(
              (specifier) => specifier.imported.name === "CardHeaderMain"
            );
            const existingCardActions = node.specifiers.find(
              (specifier) => specifier.imported.name === "CardActions"
            );

            const newImportDeclaration = `import { ${validImports
              .map((imp) => context.getSourceCode().getText(imp))
              .join(", ")} } from '@patternfly/react-core';`;

            const importMessagePrefix = [
              existingCardHeaderMain?.imported?.name,
              existingCardActions?.imported?.name,
            ]
              .filter((specifierName) => specifierName)
              .join(" and ");

            context.report({
              node,
              message: `${importMessagePrefix} ${
                importMessagePrefix.includes(" and ") ? "are" : "is"
              } no longer exported.`,
              fix(fixer) {
                return validImports.length
                  ? fixer.replaceText(node, newImportDeclaration)
                  : fixer.remove(node);
              },
            });
          },
          JSXElement(node) {
            if (
              ![
                cardHeaderImport?.imported?.name,
                cardHeaderImport?.local?.name,
              ].includes(node.openingElement.name.name)
            ) {
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

            if (!cardHeaderMain && !cardActions) {
              return;
            }
            const messagePrefix = [
              cardHeaderMain?.openingElement?.name?.name,
              cardActions?.openingElement?.name?.name,
            ]
              .filter((componentName) => componentName)
              .join(" and ");

            context.report({
              node,
              message: `${messagePrefix} ${
                messagePrefix.includes(" and ") ? "are" : "is"
              } now rendered internally within CardHeader and should be passed to CardHeader instead.`,
              fix(fixer) {
                const fixes = [];

                if (cardHeaderMain) {
                  const cardHeaderMainContent =
                    getChildComponentContent(cardHeaderMain);

                  fixes.push(
                    fixer.replaceText(cardHeaderMain, cardHeaderMainContent)
                  );
                }

                if (cardActions) {
                  const cardActionProps = cardActions.openingElement.attributes;
                  const existingClassProp = cardActionProps.find(
                    (prop) => prop.name.name === "className"
                  );
                  const cardActionsContent =
                    getChildComponentContent(cardActions).trim();
                  const newActionsPropValue = `{ actions: <>${cardActionsContent}</>, hasNoOffset: ${cardActionProps.some(
                    (prop) => prop.name.name === "hasNoOffset"
                  )}, className: ${
                    existingClassProp
                      ? `"${existingClassProp.value.value}"`
                      : undefined
                  }}`;

                  fixes.push(
                    fixer.insertTextAfter(
                      node.openingElement.name,
                      ` actions={${newActionsPropValue}} `
                    ),
                    fixer.remove(cardActions)
                  );
                }
                return fixes;
              },
            });
          },
        };
  },
};
