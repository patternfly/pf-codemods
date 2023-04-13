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

    const tdName = tableTdImport?.local.name;

    return !tableTdImport
      ? {}
      : {
          JSXOpeningElement(node) {
            if (tdName !== node.name?.name) {
              return;
            }

            const attributes = node.attributes.filter(
              (attr) =>
                attr.type === "JSXAttribute" &&
                attr.value.type === "JSXExpressionContainer" &&
                ["select", "actions"].includes(attr.name?.name)
            );

            const interfaceMap = {
              select: "TdSelectType",
              actions: "TdActionsType",
            };

            for (const attr of attributes) {
              const expr = attr.value.expression;

              const getObjectProp = (expr, propName) =>
                expr.properties.find(
                  (prop) =>
                    (prop.key.type === "Identifier" &&
                      prop.key.name === propName) ||
                    (prop.key.type === "Literal" && prop.key.value === propName)
                );

              const doReport = (disableProp) => {
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

              if (expr.type === "ObjectExpression") {
                doReport(getObjectProp(expr, "disable"));
              }

              if (expr.type === "Identifier") {
                console.log(expr.loc);

                let scope = context.getScope();
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
                      (r) => r.identifier.loc === expr.loc
                    )
                  ) {
                    variable.defs.forEach((def) => {
                      if (def.node.init?.type === "ObjectExpression") {
                        doReport(getObjectProp(def.node.init, "disable"));
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
