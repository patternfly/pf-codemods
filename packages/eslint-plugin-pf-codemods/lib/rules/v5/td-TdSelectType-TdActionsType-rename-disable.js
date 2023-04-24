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
                attr.value.type === "JSXExpressionContainer" &&
                ["select", "actions"].includes(attr.name?.name)
            );

            const interfaceMap = {
              select: "TdSelectType",
              actions: "TdActionsType",
            };

            const getObjectProp = (expr, propName) =>
              expr.properties.find(
                (prop) =>
                  (prop.key.type === "Identifier" &&
                    prop.key.name === propName) ||
                  (prop.key.type === "Literal" && prop.key.value === propName)
              );

            const doReport = (disableProp, attr) => {
              if (disableProp) {
                context.report({
                  message: `'disable' prop of interface ${
                    interfaceMap[attr.name.name]
                  } has been renamed to 'isDisabled'`,
                  node,
                  fix: function (fixer) {
                    return fixer.replaceText(disableProp.key, "isDisabled");
                  },
                });
              }
            };

            for (const attr of attributesToUpdate) {
              const expr = attr.value.expression;

              if (expr.type === "ObjectExpression") {
                doReport(getObjectProp(expr, "disable"), attr);
              }

              if (expr.type === "Identifier") {
                let scope = context.getSourceCode().getScope(node);
                
                while (scope !== null) {
                  const variable = scope.variables.find(
                    (v) => v.name === expr.name
                  );

                  if (!variable) {
                    scope = scope.upper;
                    continue;
                  }
                  
                  if (
                    variable.references.some(
                      (ref) => ref.identifier.loc === expr.loc
                    )
                  ) {
                    variable.defs.forEach((def) => {
                      if (def.node.init?.type === "ObjectExpression") {
                        doReport(getObjectProp(def.node.init, "disable"), attr);
                      }
                    });
                    break;
                  }
                }
              }
            }
          },
        };
  },
};
