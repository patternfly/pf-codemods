const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8924
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const componentsAttributes = {
      Alert: "variant",
      AlertIcon: "variant",
      NotificationDrawerListItemHeader: "variant",
      Modal: "titleIconVariant",
      ModalContent: "titleIconVariant",
      Popover: "alertSeverityVariant",
    };

    const allImports = getPackageImports(context, "@patternfly/react-core");

    const componentImports = allImports.filter((specifier) =>
      Object.keys(componentsAttributes).includes(specifier.imported.name)
    );

    const alertVariantImport = allImports.find(
      (specifier) => specifier.imported.name === "AlertVariant"
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

    return componentImports.length == 0
      ? {}
      : {
          MemberExpression(node) {
            if (
              alertVariantImport &&
              node.object.type === "Identifier" &&
              node.object.name === alertVariantImport.local.name
            ) {
              const message = `We have renamed option 'default' to 'custom' in ${alertVariantImport.local.name} enum`;

              if (node.computed) {
                const nodeToReplace =
                  node.property.type === "Literal"
                    ? node.property
                    : findVariableDeclaration(
                        node.property.name,
                        context.getSourceCode().getScope(node)
                      )?.defs[0].node.init;
                if (
                  nodeToReplace &&
                  nodeToReplace.type === "Literal" &&
                  nodeToReplace.value === "default"
                ) {
                  context.report({
                    node,
                    message: message,
                    fix(fixer) {
                      return fixer.replaceText(nodeToReplace, '"custom"');
                    },
                  });
                }
              } else {
                if (node.property.name === "default") {
                  context.report({
                    node,
                    message: message,
                    fix(fixer) {
                      return fixer.replaceText(node.property, "custom");
                    },
                  });
                }
              }
            }
          },
          JSXOpeningElement(node) {
            const nodeImport = componentImports.find(
              (imp) => imp.local.name === node.name.name
            );

            if (!nodeImport) {
              return;
            }

            const attribute = node.attributes.find(
              (attr) =>
                attr.name?.name ===
                componentsAttributes[nodeImport.imported.name]
            );

            if (!attribute) {
              return;
            }

            let nodeToReplace = undefined;

            if (attribute.value.type === "Literal") {
              nodeToReplace = attribute.value;
            }

            if (attribute.value.type === "JSXExpressionContainer") {
              const expr = attribute.value.expression;

              if (expr.type === "Literal") {
                nodeToReplace = expr;
              }

              if (expr.type === "Identifier") {
                nodeToReplace = findVariableDeclaration(
                  expr.name,
                  context.getSourceCode().getScope(expr)
                )?.defs[0].node.init;
              }
            }

            if (
              nodeToReplace &&
              nodeToReplace.type === "Literal" &&
              nodeToReplace.value === "default"
            ) {
              context.report({
                node,
                message: `We have renamed option 'default' to 'custom' in ${attribute.name.name} prop of ${nodeImport.local.name} component`,
                fix(fixer) {
                  return fixer.replaceText(nodeToReplace, '"custom"');
                },
              });
            }
          },
        };
  },
};
