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
            if (
              imports.map((imp) => imp.local.name).includes(node.name.name) &&
              onToggleProp
            ) {
              context.report({
                node,
                message: `${node.name.name} onToggle prop has been updated to include the event parameter as its first parameter. onToggle handlers may require an update.`,
                fix(fixer) {
                  const { type, params, name } = onToggleProp.value?.expression;
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
                    type === "ArrowFunctionExpression" &&
                    params.length === 1
                  ) {
                    fixes.push(createReplacerFix(params[0]));
                  }

                  if (type === "Identifier") {
                    const variablesAndFunctions = context
                      .getAncestors()
                      .find((ancestor) => ancestor.type === "Program")
                      .body.filter((bodyItem) =>
                        ["VariableDeclaration", "FunctionDeclaration"].includes(
                          bodyItem.type
                        )
                      );

                    const matchingDeclaration = variablesAndFunctions.find(
                      (varOrFunc) => {
                        if (varOrFunc.declarations) {
                          return varOrFunc.declarations.find(
                            (declaration) => declaration.id.name === name
                          );
                        }

                        return varOrFunc.id.name === name;
                      }
                    );

                    const currentParams = matchingDeclaration.declarations
                      ? matchingDeclaration.declarations.find(
                          (declaration) => declaration.id.name === name
                        ).init.params
                      : matchingDeclaration.params;

                    if (currentParams.length === 1) {
                      fixes.push(createReplacerFix(currentParams[0]));
                    }
                  }

                  return fixes;
                },
              });
            }
          },
        };
  },
};
