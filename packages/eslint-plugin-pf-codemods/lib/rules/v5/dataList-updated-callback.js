const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8723
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const dataListImport = getPackageImports(
      context,
      "@patternfly/react-core"
    ).find((specifier) => specifier.imported.name === "DataList");

    return !dataListImport
      ? {}
      : {
          JSXOpeningElement(node) {
            const onSelectDataListItemProp = node.attributes.find(
              (attr) => attr.name.name === "onSelectDataListItem"
            );

            const propProperties = {
              type: onSelectDataListItemProp?.value?.expression?.type,
              name: onSelectDataListItemProp?.value?.expression?.name,
            };

            if (propProperties.type === "ArrowFunctionExpression") {
              propProperties.params =
                onSelectDataListItemProp?.value?.expression?.params;
            } else if (propProperties.type === "Identifier") {
              const currentScope = context.getScope();
              const matchingVariable = currentScope.variables.find(
                (variable) => variable.name === propProperties.name
              );
              const matchingDefinition = matchingVariable.defs.find(
                (def) => def.name.name === propProperties.name
              );

              propProperties.params =
                matchingDefinition.type === "FunctionName"
                  ? matchingDefinition.node.params
                  : matchingDefinition.node.init.params;
            }
            const { type, params } = propProperties;

            if (
              dataListImport.local.name === node.name.name &&
              ((params?.length === 1 &&
                ["ArrowFunctionExpression", "Identifier"].includes(type)) ||
                type === "MemberExpression")
            ) {
              context.report({
                node,
                message: `The "onSelectDataListItem" prop for DataList has been updated to include the event parameter as its first parameter. "onSelectDataListItem" handlers may require an update.`,
                fix(fixer) {
                  const fixes = [];
                  const createReplacerFix = (functionParam) => {
                    const hasParenthesis =
                      context.getTokenAfter(functionParam).value === ")";
                    const replacementParams = `_event, ${functionParam.name}`;

                    return fixer.replaceText(
                      functionParam,
                      hasParenthesis
                        ? replacementParams
                        : `(${replacementParams})`
                    );
                  };

                  if (
                    ["ArrowFunctionExpression", "Identifier"].includes(type) &&
                    params.length === 1
                  ) {
                    fixes.push(createReplacerFix(params[0]));
                  }

                  return fixes;
                },
              });
            }
          },
        };
  },
};
