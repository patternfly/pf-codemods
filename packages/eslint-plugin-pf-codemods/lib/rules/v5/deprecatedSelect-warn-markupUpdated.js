const { getFromPackage } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/9172
module.exports = {
  meta: {},
  create: function (context) {
    const { imports } = getFromPackage(
      context,
      "@patternfly/react-core/deprecated"
    );
    const selectImport = imports.find(
      (specifier) => specifier.imported.name === "Select"
    );

    return !selectImport
      ? {}
      : {
          JSXOpeningElement(node) {
            if (node.name?.name !== selectImport.local?.name) {
              return;
            }

            const variantProp = node.attributes.find(
              (attr) => attr.name?.name === "variant"
            );

            let variantValue;

            if (variantProp?.value?.expression?.type === "Identifier") {
              const scope = context.getSourceCode().getScope(node);
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

              const variantVariableInit = findVariableDeclaration(
                variantProp.value.expression.name,
                scope
              )?.defs[0]?.node?.init;

              variantValue =
                variantVariableInit?.property?.name ||
                variantVariableInit?.value;
            } else {
              variantValue =
                variantProp?.value?.expression?.property?.name ||
                variantProp?.value?.value;
            }

            if (variantValue?.startsWith("typeahead")) {
              context.report({
                node,
                message:
                  "Typeahead variants of our deprecated Select have had their markup changed. Selectors may need updating.",
              });
            }
          },
        };
  },
};
