const { getPackageImports, renameProps0 } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8931
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const backgroundImageImports = getPackageImports(
      context,
      "@patternfly/react-core"
    ).filter((specifier) => specifier.imported.name == "BackgroundImage");

    return !backgroundImageImports.length
      ? {}
      : {
          JSXOpeningElement(node) {
            if (
              !backgroundImageImports
                .map((imp) => imp.local.name)
                .includes(node.name.name)
            ) {
              return;
            }

            renameProps0(context, backgroundImageImports, node, {
              BackgroundImage: {
                filter: "",
              },
            });

            const srcProp = node.attributes.find(
              (attribute) => attribute.name?.name === "src"
            );
            const getIdentifierType = (identifier) => {
              const currentScope = context.getScope();
              const matchingVariable = currentScope.variables.find(
                (variable) => variable.name === identifier
              );

              return matchingVariable?.defs[0].node?.init?.type;
            };
            const srcIsString =
              srcProp?.value.expression?.type === "Identifier"
                ? getIdentifierType(srcProp.value.expression.name) === "Literal"
                : srcProp?.value.type === "Literal";

            if (srcProp && !srcIsString) {
              context.report({
                node,
                message: `The "src" prop for BackgroundImage has had it's type updated to just a string and no longer accepts a BackgroundImageSrcMap. The prop must be manually updated to the desired image src.`,
              });
            }
          },
        };
  },
};
