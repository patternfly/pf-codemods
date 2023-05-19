const { getFromPackage, renamePropsOnNode } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8931
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const loginPageImports = getFromPackage(
      context,
      "@patternfly/react-core"
    ).imports.filter((specifier) => specifier.imported.name == "LoginPage");

    return !loginPageImports.length
      ? {}
      : {
          JSXOpeningElement(node) {
            if (
              !loginPageImports
                .map((imp) => imp.local.name)
                .includes(node.name.name)
            ) {
              return;
            }

            renamePropsOnNode(context, loginPageImports, node, {
              LoginPage: {
                backgroundImgAlt: "",
              },
            });

            const backgroundImgSrcProp = node.attributes.find(
              (attribute) => attribute.name?.name === "backgroundImgSrc"
            );
            const getIdentifierType = (identifier) => {
              const currentScope = context.getScope();
              const matchingVariable = currentScope.variables.find(
                (variable) => variable.name === identifier
              );

              return matchingVariable?.defs[0].node?.init?.type;
            };
            const srcIsString =
              backgroundImgSrcProp?.value.expression?.type === "Identifier"
                ? getIdentifierType(
                    backgroundImgSrcProp.value.expression.name
                  ) === "Literal"
                : backgroundImgSrcProp?.value.type === "Literal";

            if (backgroundImgSrcProp && !srcIsString) {
              context.report({
                node,
                message: `The "backgroundImgSrc" prop for LoginPage has had it's type updated to just a string and no longer accepts a BackgroundImageSrcMap. The prop must be manually updated to the desired image src.`,
              });
            }
          },
        };
  },
};
