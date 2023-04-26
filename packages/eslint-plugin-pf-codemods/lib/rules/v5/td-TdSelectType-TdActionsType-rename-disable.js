const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8861
// https://github.com/patternfly/patternfly-react/pull/8904
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const tableTdImport = getPackageImports(
      context,
      "@patternfly/react-table"
    ).find((specifier) => "Td" === specifier.imported.name);

    return !tableTdImport
      ? {}
      : {
          JSXOpeningElement(node) {
            if (tableTdImport.local.name !== node.name.name) {
              return;
            }

            const attributesToUpdate = node.attributes.filter(
              (attr) =>
                attr.type === "JSXAttribute" &&
                attr.value?.type === "JSXExpressionContainer" &&
                ["select", "actions"].includes(attr.name?.name)
            );

            const getObjectProp = (expr, propName) =>
              expr.properties.find(
                (prop) =>
                  (prop.key.type === "Identifier" &&
                    prop.key.name === propName) ||
                  (prop.key.type === "Literal" && prop.key.value === propName)
              );

            const findVariableDeclaration = (name, scope) => {
              while (scope !== null) {
                const variable = scope.variables.find((v) => v.name === name);

                if (variable) {
                  return variable;
                }

                scope = scope.upper;
              }
              return undefined;
            };

            const handleObjectExpression = (expr, toReplace) => {
              const disableProp = getObjectProp(expr, "disable");
              disableProp && toReplace.push(disableProp.key);

              if (disableProp?.shorthand) {
                const variable = findVariableDeclaration(
                  "disable",
                  context.getSourceCode().getScope(expr)
                );

                variable && toReplace.push(variable.defs[0].node.id);
              }
            };

            for (const attr of attributesToUpdate) {
              const expr = attr.value.expression;

              let toReplace = [];

              if (expr.type === "ObjectExpression") {
                handleObjectExpression(expr, toReplace);
              }

              if (expr.type === "Identifier") {
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
                  if (
                    n.type === "MemberExpression" &&
                    (n.property.name === "disable" ||
                      n.property.value === "disable")
                  ) {
                    toReplace.push(n.property);
                  }

                  if (
                    n.type === "AssignmentExpression" &&
                    n.right.type === "ObjectExpression"
                  ) {
                    handleObjectExpression(n.right, toReplace);
                  }
                });
              }

              toReplace.length &&
                context.report({
                  message: `'disable' prop of interface ${
                    {
                      select: "TdSelectType",
                      actions: "TdActionsType",
                    }[attr.name.name]
                  } has been renamed to 'isDisabled'`,
                  node,
                  fix: function (fixer) {
                    return toReplace.map((val) =>
                      fixer.replaceText(
                        val,
                        val.type === "Literal" ? '"isDisabled"' : "isDisabled"
                      )
                    );
                  },
                });
            }
          },
        };
  },
};
