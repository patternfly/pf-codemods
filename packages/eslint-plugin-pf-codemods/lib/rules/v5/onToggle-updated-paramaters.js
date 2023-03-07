const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8667
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const onToggleAPIUpdateList = [
      "ApplicationLauncher",
      "BadgeToggle",
      "DropdownToggle",
      "KebabToggle",
      "Toggle",
      "Select",
      "SelectToggle",
    ];
    const imports = getPackageImports(context, "@patternfly/react-core").filter(
      (specifier) => onToggleAPIUpdateList.includes(specifier.imported.name)
    );

    return imports.length === 0
      ? {}
      : {
          JSXOpeningElement(node) {
            const onToggleProp = node.attributes.find(
              (attr) => attr.name.name === "onToggle"
            );

            const propProperties = {
              type: onToggleProp?.value?.expression?.type,
              name: onToggleProp?.value?.expression?.name,
            };

            if (propProperties.type === "ArrowFunctionExpression") {
              propProperties.params = onToggleProp?.value?.expression?.params;
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
              imports.map((imp) => imp.local.name).includes(node.name.name) &&
              ((params?.length === 1 &&
                ["ArrowFunctionExpression", "Identifier"].includes(type)) ||
                type === "MemberExpression")
            ) {
              context.report({
                node,
                message: `${node.name.name} onToggle prop has been updated to include the event parameter as its first parameter. onToggle handlers may require an update.`,
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
