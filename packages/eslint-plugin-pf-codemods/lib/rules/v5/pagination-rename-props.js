const { getFromPackage, findVariableDeclaration } = require("../../helpers");

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

              const expr = titlesProp?.value.expression;

              let toReplace = {
                currPage: [],
                paginationTitle: [],
                toFirstPage: [],
                toLastPage: [],
                toNextPage: [],
                toPreviousPage: [],
                optionsToggle: [],
              };

              const updatedTitlesPropNames = {
                currPage: "currPageAriaLabel",
                paginationTitle: "paginationAriaLabel",
                toFirstPage: "toFirstPageAriaLabel",
                toLastPage: "toLastPageAriaLabel",
                toNextPage: "toNextPageAriaLabel",
                toPreviousPage: "toPreviousPageAriaLabel",
                optionsToggle: "optionsToggleAriaLabel",
              };

              const getObjectProp = (expr, propName) =>
                expr.properties.find(
                  (prop) =>
                    (prop.key.type === "Identifier" &&
                      prop.key.name === propName) ||
                    (prop.key.type === "Literal" && prop.key.value === propName)
                );

              const handleObjectExpression = (expr, toReplace) => {
                for (const propName in updatedTitlesPropNames) {
                  const prop = getObjectProp(expr, propName);
                  prop && toReplace[propName].push(prop.key);

                  if (prop?.shorthand) {
                    const variable = findVariableDeclaration(
                      propName,
                      context.getSourceCode().getScope(expr)
                    );

                    variable &&
                      toReplace[propName].push(variable.defs[0].node.id);
                  }
                }
              };

              if (expr?.type === "ObjectExpression") {
                handleObjectExpression(expr, toReplace);
              }

              if (expr?.type === "Identifier") {
                const variable = findVariableDeclaration(
                  expr.name,
                  context.getSourceCode().getScope(node)
                );

                const variableValue = variable.defs[0].node.init;

                if (variableValue?.type === "ObjectExpression") {
                  handleObjectExpression(variableValue, toReplace);
                }

                const nodesUsingVariable = variable.references.map(
                  (ref) => ref.identifier.parent
                );

                nodesUsingVariable.forEach((n) => {
                  if (n.type === "MemberExpression") {
                    const propName = n.property.name
                      ? n.property.name
                      : n.property.value;

                    propName in updatedTitlesPropNames &&
                      toReplace[propName].push(n.property);
                  }

                  if (
                    n.type === "AssignmentExpression" &&
                    n.right.type === "ObjectExpression"
                  ) {
                    handleObjectExpression(n.right, toReplace);
                  }
                });
              }

              for (const oldName in toReplace) {
                const replacements = toReplace[oldName];
                const newName = updatedTitlesPropNames[oldName];

                replacements.length &&
                  context.report({
                    message: `The "${oldName}" sub-prop for Pagination's "titles" prop has been renamed to "${newName}".`,
                    node,
                    fix: function (fixer) {
                      return replacements.map((val) =>
                        fixer.replaceText(
                          val,
                          val.type === "Literal" ? `"${newName}"` : newName
                        )
                      );
                    },
                  });
              }
            }
          },
        };
  },
};
